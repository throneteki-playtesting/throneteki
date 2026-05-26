import DrawCard from '../../drawcard.js';

class TheGodsEye extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Reduce ambush/shadow cost for out-of-faction card',
            cost: ability.costs.kneelSelf(),
            message:
                '{player} kneels {source} to reduce the cost of the next neutral or out-of-faction card they ambush or bring out of shadows this phase by 3',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'current',
                    effect: ability.effects.reduceNextAmbushedOrOutOfShadowsCardCost(
                        3,
                        (card) =>
                            card.isFaction('neutral') ||
                            !card.isFaction(context.player.faction.getPrintedFaction())
                    )
                }));
            }
        });
    }
}

TheGodsEye.code = '27605';
TheGodsEye.version = '1.0.1';

export default TheGodsEye;
