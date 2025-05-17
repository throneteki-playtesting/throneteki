import DrawCard from '../../drawcard.js';

class SerArysOakheart extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isAttacking(),
            targetController: 'any',
            effect: ability.effects.setDefenderMinimum(1)
        });
    }
}

SerArysOakheart.code = '00173';

export default SerArysOakheart;
