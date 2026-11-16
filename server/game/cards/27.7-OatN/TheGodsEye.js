import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheGodsEye extends DrawCard {
    // The God's Eye (27605)
    // Action: Kneel The God's Eye to reduce the cost of the next neutral or out-of-faction card you
    // ambush or bring out of shadows this phase by 3.
    setupCardAbilities(ability) {
        this.action({
            title: 'Reduce ambush/shadow cost for out-of-faction card',
            clickToActivate: true,
            cost: ability.costs.kneelSelf(),
            message:
                '{player} kneels {source} to reduce the cost of the next neutral or out-of-faction card they ambush or bring out of shadows this phase by 3',
            gameAction: GameActions.lastingEffect(() => ({
                duration: 'untilEndOfPhase',
                targetController: 'current',
                effect: ability.effects.reduceNextAmbushedOrOutOfShadowsCardCost(
                    3,
                    (card, context) =>
                        card.isFaction('neutral') ||
                        !card.isFaction(context.source.controller.faction.getPrintedFaction())
                )
            }))
        });
    }
}

TheGodsEye.code = '27605';
TheGodsEye.version = '1.0.1';

export default TheGodsEye;
