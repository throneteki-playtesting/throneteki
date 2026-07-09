import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AGameOfCyvasse extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Force players to kneel intrigue characters',
            cost: ability.costs.playEvent(),
            phase: 'challenge',
            condition: () =>
                this.controller.anyCardsInPlay(
                    (card) => card.getType() === 'character' && card.hasIcon('intrigue')
                ),
            max: ability.limit.perRound(1),
            target: {
                choosingPlayer: 'each',
                ifAble: true,
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.controller === context.choosingPlayer &&
                    card.getType() === 'character' &&
                    card.hasIcon('intrigue') &&
                    !card.kneeled &&
                    GameActions.kneelCard({ card }).allow()
            },
            handler: (context) => {
                const selections = context.targets.selections.filter((s) => !!s.value);
                const kneeledCards = selections.map((s) => s.value);

                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        kneeledCards.map((card) => GameActions.kneelCard({ card }))
                    ),
                    context
                );
                this.game.addMessage(
                    '{0} plays {1} to kneel {2}',
                    this.controller,
                    this,
                    kneeledCards
                );

                if (kneeledCards.length === 0) {
                    return;
                }

                const lowestStr = Math.min(...kneeledCards.map((c) => c.getStrength()));
                const lowestCards = kneeledCards.filter((c) => c.getStrength() === lowestStr);

                this.game.addMessage('{0} returns {1} to their hand', this.controller, lowestCards);
                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        lowestCards.map((card) => GameActions.returnCardToHand({ card }))
                    ),
                    context
                );
            }
        });
    }
}

AGameOfCyvasse.code = '27547';
AGameOfCyvasse.version = '1.1.0';

export default AGameOfCyvasse;
