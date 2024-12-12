import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheKingsJustice extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.strengthDifference >= 5
            },
            cost: ability.costs.kneelParent(),
            target: {
                cardCondition: {
                    location: 'play area',
                    kneeled: true,
                    condition: (card, context) =>
                        card.controller === context.event.challenge.loser &&
                        card.hasPrintedCost() &&
                        card.getPrintedCost() <= this.parent.getPrintedCost()
                }
            },
            message: '{player} uses {source} and kneels {costs.kneel} to kill {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.kill((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

TheKingsJustice.code = '26507';
TheKingsJustice.version = '1.0.0';

export default TheKingsJustice;
