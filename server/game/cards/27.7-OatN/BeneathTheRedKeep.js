import PlotCard from '../../plotcard.js';

class BeneathTheRedKeep extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.currentPhase === 'challenge',
            targetController: 'any',
            effect: ability.effects.cannotTriggerCardAbilities(
                (ability) =>
                    ['character', 'location', 'attachment'].includes(ability.card.getType()) &&
                    !ability.card.isShadow()
            )
        });
    }
}

BeneathTheRedKeep.code = '27614';
BeneathTheRedKeep.version = '1.0.1';

export default BeneathTheRedKeep;
