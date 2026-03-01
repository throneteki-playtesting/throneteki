// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for The God's Eye

import DrawCard from '../../drawcard.js';

class TheGodsEye extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Reduce ambush/shadow cost for out-of-faction card',
            cost: ability.costs.kneelSelf(),
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'current',
                    effect: ability.effects.reduceNextAmbushedOrOutOfShadowsCardCost(
                        3,
                        (card) => !card.isFaction(context.player.faction.getPrintedFaction())
                    )
                }));
                this.game.addMessage(
                    '{0} kneels {1} to reduce the cost of the next out-of-faction card they ambush or bring out of shadows this phase by 3',
                    context.player,
                    this
                );
            }
        });
    }
}

TheGodsEye.code = '27605';
TheGodsEye.version = '1.0.0';

export default TheGodsEye;
