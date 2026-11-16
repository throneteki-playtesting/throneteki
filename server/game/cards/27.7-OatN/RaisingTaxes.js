import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class RaisingTaxes extends PlotCard {
    // Raising Taxes (27616)
    // When Revealed: Move all gold on characters to your gold pool.
    setupCardAbilities() {
        this.whenRevealed({
            message: '{player} uses {source} to move all gold from characters to their gold pool',
            gameAction: GameActions.simultaneously((context) =>
                context.game
                    .filterCardsInPlay((card) => card.getType() === 'character' && card.gold > 0)
                    .map((card) =>
                        GameActions.transferGold({
                            from: card,
                            to: context.player,
                            amount: card.gold
                        })
                    )
            )
        });
    }
}

RaisingTaxes.code = '27616';
RaisingTaxes.version = '1.0.0';

export default RaisingTaxes;
