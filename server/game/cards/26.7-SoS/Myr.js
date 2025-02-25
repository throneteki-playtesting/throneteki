import DrawCard from '../../drawcard.js';

class Myr extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Kneel to reduce by 3',
            cost: ability.costs.kneelSelf(),
            message:
                '{player} kneels {source} to reduce the cost of the next out-of-faction card they ambush or bring out of shadows this phase by 3',
            handler: () => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'current',
                    effect: ability.effects.reduceNextAmbushedOrOutOfShadowsCardCost(3, (card) =>
                        card.isOutOfFaction()
                    )
                }));
            }
        });
    }
}

Myr.code = '26605';
Myr.version = '1.0.1';

export default Myr;
