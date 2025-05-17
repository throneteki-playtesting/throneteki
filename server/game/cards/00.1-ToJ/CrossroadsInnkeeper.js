import DrawCard from '../../drawcard.js';

class CrossroadsInnkeeper extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Reduce character cost',
            clickToActivate: true,
            phase: 'marshal',
            cost: ability.costs.kneelSelf(),
            handler: (context) => {
                this.game.addMessage(
                    '{0} kneels {1} to reduce the cost of the next character by 1',
                    this.controller,
                    this
                );
                this.untilEndOfPhase((ability) => ({
                    condition: () => !context.abilityDeactivated,
                    targetController: 'current',
                    effect: ability.effects.reduceNextMarshalledCardCost(
                        1,
                        (card) => card.getType() === 'character'
                    )
                }));
            }
        });
    }
}

CrossroadsInnkeeper.code = '00361';

export default CrossroadsInnkeeper;
