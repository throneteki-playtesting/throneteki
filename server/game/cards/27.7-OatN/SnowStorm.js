import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class SnowStorm extends PlotCard {
    // Snow Storm (27617)
    // When Revealed: Kneel each attachment and location.
    setupCardAbilities() {
        this.whenRevealed({
            message: '{player} uses {source} to kneel each attachment and location',
            gameAction: GameActions.simultaneously((context) =>
                context.game
                    .filterCardsInPlay(
                        (card) =>
                            (card.getType() === 'attachment' || card.getType() === 'location') &&
                            !card.kneeled
                    )
                    .map((card) => GameActions.kneelCard({ card }))
            )
        });
    }
}

SnowStorm.code = '27617';
SnowStorm.version = '1.0.0';

export default SnowStorm;
