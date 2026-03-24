// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for The God's Eye
// - 2026-02-28: Refactored to use message:

import DrawCard from '../../drawcard.js';

class TheGodsEye extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Reduce ambush/shadow cost for out-of-faction card',
            cost: ability.costs.kneelSelf(),
            message:
                '{player} kneels {source} to reduce the cost of the next out-of-faction card they ambush or bring out of shadows this phase by 3',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'current',
                    effect: ability.effects.reduceNextAmbushedOrOutOfShadowsCardCost(
                        3,
                        (card) => !card.isFaction(context.player.faction.getPrintedFaction())
                    )
                }));
            }
        });
    }
}

TheGodsEye.code = '27605';
TheGodsEye.version = '1.0.0';

export default TheGodsEye;
