// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Brotherhood's Bounty

import DrawCard from '../../drawcard.js';
import TextHelper from '../../TextHelper.js';

class BrotherhoodsBounty extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Gain gold and draw cards',
            condition: () =>
                !this.controller.anyCardsInPlay(
                    (card) => card.getType() === 'character' && card.isLoyal()
                ),
            max: ability.limit.perRound(1),
            handler: (context) => {
                let claim = context.player.getClaim();
                let gold = this.game.addGold(context.player, claim);
                let cards = context.player.drawCardsToHand(claim).length;
                this.game.addMessage(
                    '{0} plays {1} to gain {2} gold and draw {3}',
                    context.player,
                    this,
                    gold,
                    TextHelper.count(cards, 'card')
                );
            }
        });
    }
}

BrotherhoodsBounty.code = '27607';
BrotherhoodsBounty.version = '1.0.0';

export default BrotherhoodsBounty;
