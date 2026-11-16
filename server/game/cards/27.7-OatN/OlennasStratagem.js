import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class OlennasStratagem extends DrawCard {
    // Olenna's Stratagem (27595)
    // While you control Queen of Thorns, reduce the cost to play Olenna's Stratagem by 2.
    // Reaction: After you win an [intrigue] challenge, choose a non-event card in your discard pile
    // and place it in shadows. While that card is in shadows it gains shadow (X). X is its printed
    // cost. (Max 1 per challenge.)
    setupCardAbilities(ability) {
        this.persistentEffect({
            location: 'any',
            condition: (context) =>
                context.source.controller.anyCardsInPlay(
                    (card) => card.name === 'The Queen of Thorns'
                ),
            targetController: 'current',
            effect: ability.effects.reduceSelfCost('play', 2)
        });

        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    event.challenge.challengeType === 'intrigue'
            },
            max: ability.limit.perChallenge(1),
            target: {
                activePromptTitle: 'Select a card',
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.player &&
                    card.getType() !== 'event',
                gameAction: GameActions.putIntoShadows((context) => ({
                    card: context.target
                })).then({
                    gameAction: GameActions.lastingEffect((context) => {
                        const card = context.parentContext.target;
                        return {
                            duration: 'custom',
                            condition: () => card.location === 'shadows',
                            targetLocation: 'any',
                            match: card,
                            effect: ability.effects.addKeyword(
                                `Shadow (${card.translateXValue(card.getPrintedCost())})`
                            )
                        };
                    })
                })
            },
            message:
                '{player} plays {source} to place {target} into shadows from their discard pile'
        });
    }
}

OlennasStratagem.code = '27595';
OlennasStratagem.version = '1.1.1';

export default OlennasStratagem;
