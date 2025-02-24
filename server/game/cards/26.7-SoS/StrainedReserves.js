import CardEntersPlayTracker from '../../EventTrackers/CardEntersPlayTracker.js';
import PlotCard from '../../plotcard.js';

class StrainedReserves extends PlotCard {
    setupCardAbilities(ability) {
        this.enterPlayTracker = CardEntersPlayTracker.forRound(this.game);

        this.persistentEffect({
            targetController: 'any',
            effect: [
                ability.effects.cannotMarshal((card) => this.hasReachedLimit(card.controller)),
                ability.effects.cannotAmbush((card) => this.hasReachedLimit(card.controller)),
                ability.effects.cannotBringOutOfShadows((card) =>
                    this.hasReachedLimit(card.controller)
                )
            ]
        });
    }

    hasReachedLimit(player) {
        return (
            player.activePlot &&
            !player.activePlot.hasTrait('Summer') &&
            this.enterPlayTracker.events.filter(
                (event) =>
                    event.card.controller === player &&
                    ['marshal', 'ambush', 'outOfShadows'].includes(event.playingType)
            ).length > 2
        );
    }
}

StrainedReserves.code = '26617';
StrainedReserves.version = '1.0.1';

export default StrainedReserves;
