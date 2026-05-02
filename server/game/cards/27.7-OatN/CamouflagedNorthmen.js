import DrawCard from '../../drawcard.js';

class CamouflagedNorthmen extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isAttacking(),
            targetController: 'any',
            match: (card) => card.getType() === 'character' && card.isShadow(),
            effect: ability.effects.cannotBeDeclaredAsDefender()
        });
    }
}

CamouflagedNorthmen.code = '27565';
CamouflagedNorthmen.version = '1.0.0';

export default CamouflagedNorthmen;
