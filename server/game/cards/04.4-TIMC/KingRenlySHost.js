import DrawCard from '../../drawcard.js';

class KingRenlySHost extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            // STR increase while Summer
            condition: () => this.anyPlotHasTrait('Summer'),
            match: this,
            effect: ability.effects.modifyStrength(4)
        });
        this.persistentEffect({
            // cannot attack while Winter
            condition: () => this.anyPlotHasTrait('Winter'),
            match: this,
            effect: ability.effects.cannotBeDeclaredAsAttacker()
        });
    }

    anyPlotHasTrait(trait) {
        return this.game
            .getPlayers()
            .some((player) => player.activePlot && player.activePlot.hasTrait(trait));
    }
}

KingRenlySHost.code = '04063';

export default KingRenlySHost;
