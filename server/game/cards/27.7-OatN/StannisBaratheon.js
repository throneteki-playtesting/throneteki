import DrawCard from '../../drawcard.js';

class StannisBaratheon extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.getType() === 'character',
            condition: () => this.game.anyPlotHasTrait('Winter'),
            targetController: 'opponent',
            effect: [
                ability.effects.cannotIncreaseStrength(
                    (context) => context.resolutionStage === 'effect'
                )
            ]
        });
    }
}

StannisBaratheon.code = '27501';
StannisBaratheon.version = '1.0.1';

export default StannisBaratheon;
