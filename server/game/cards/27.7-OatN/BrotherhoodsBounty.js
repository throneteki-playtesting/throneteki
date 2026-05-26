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
            phase: 'challenge',
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
BrotherhoodsBounty.version = '1.0.1';

export default BrotherhoodsBounty;
