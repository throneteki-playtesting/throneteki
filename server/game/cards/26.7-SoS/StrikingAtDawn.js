import PlotCard from '../../plotcard.js';

class StrikingAtDawn extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.getType() === 'character',
            targetController: 'any',
            effect: [
                ability.effects.cannotDecreaseStrength(
                    (context) => context.resolutionStage === 'effect'
                ),
                ability.effects.cannotIncreaseStrength(
                    (context) => context.resolutionStage === 'effect'
                )
            ]
        });
    }
}

StrikingAtDawn.code = '26616';
StrikingAtDawn.version = '1.0.0';

export default StrikingAtDawn;
