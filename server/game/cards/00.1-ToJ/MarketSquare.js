import DrawCard from '../../drawcard.js';

class MarketSquare extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Reduce next card',
            clickToActivate: true,
            phase: 'marshal',
            cost: ability.costs.kneelSelf(),
            handler: (context) => {
                this.game.addMessage(
                    '{0} kneels {1} to reduce the cost of the next card by 1',
                    context.player,
                    this
                );
                this.untilEndOfPhase((ability) => ({
                    condition: () => !context.abilityDeactivated,
                    targetController: 'current',
                    effect: ability.effects.reduceNextMarshalledCardCost(1)
                }));
            }
        });
    }
}

MarketSquare.code = '00365';

export default MarketSquare;
