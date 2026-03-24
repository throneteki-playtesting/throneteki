// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Brotherhood's Bounty
// - 2026-02-28: Refactored to use message: and GameActions

import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class BrotherhoodsBounty extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Gain gold and draw cards',
            condition: () =>
                !this.controller.anyCardsInPlay(
                    (card) => card.getType() === 'character' && card.isLoyal()
                ),
            max: ability.limit.perRound(1),
            message:
                '{player} uses {source} to gain gold and draw cards equal to their claim value',
            gameAction: GameActions.simultaneously((context) => {
                const claim = context.player.getClaim();
                return [
                    GameActions.gainGold({ player: context.player, amount: claim }),
                    GameActions.drawCards({ player: context.player, amount: claim })
                ];
            })
        });
    }
}

BrotherhoodsBounty.code = '27607';
BrotherhoodsBounty.version = '1.0.0';

export default BrotherhoodsBounty;
