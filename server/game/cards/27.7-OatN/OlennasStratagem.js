import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class OlennasStratagem extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.controller.anyCardsInPlay((card) => card.name === 'The Queen of Thorns'),
            match: this,
            targetController: 'current',
            effect: ability.effects.reduceSelfCost('play', 2)
        });

        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.challengeType === 'intrigue'
            },
            max: ability.limit.perChallenge(1),
            target: {
                activePromptTitle: 'Select a card',
                cardCondition: (card) =>
                    card.location === 'discard pile' &&
                    card.controller === this.controller &&
                    card.getType() !== 'event'
            },
            message:
                '{player} plays {source} to place {target} into shadows from their discard pile',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows((context) => ({ card: context.target })).thenExecute(
                        (event) => {
                            const shadowCost = event.card.getCost();
                            this.lastingEffect((ability) => ({
                                until: {
                                    onCardOutOfShadows: (e) => e.card === event.card,
                                    onCardDiscarded: (e) => e.card === event.card,
                                    onCardLeftPlay: (e) => e.card === event.card
                                },
                                match: event.card,
                                targetLocation: 'shadows',
                                effect: ability.effects.addKeyword(`shadow (${shadowCost})`)
                            }));
                        }
                    ),
                    context
                );
            }
        });
    }
}

OlennasStratagem.code = '27595';
OlennasStratagem.version = '1.1.1';

export default OlennasStratagem;
