import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class QueenOfMeereen extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: ['Lady'] });
        this.whileAttached({
            effect: [ability.effects.addKeyword('Queen'), ability.effects.addKeyword('Insight')]
        });
        this.action({
            title: 'Discard to reduce',
            cost: ability.costs.discardAnyFromHand(),
            message: {
                format: '{player} discards {costs.discardFromHand} from their hand to reduce the cost of the next card they marshal or bring out of shadows this phase by {amount}',
                args: { amount: (context) => this.getAmount(context) }
            },
            limit: ability.limit.perRound(1),
            gameAction: GameActions.genericHandler((context) => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'current',
                    effect: ability.effects.reduceNextMarshalledOrOutOfShadowsCardCost(
                        this.getAmount(context)
                    )
                }));
            })
        });
    }

    getAmount(context) {
        return context.costs.discardFromHand.length;
    }
}

QueenOfMeereen.code = '26579';
QueenOfMeereen.version = '1.0.0';

export default QueenOfMeereen;
