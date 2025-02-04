import DrawCard from '../../drawcard.js';

class WarElephants extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            targetLocation: 'hand',
            effect: [
                ability.effects.cannotMarshal((card) => card === this),
                ability.effects.cannotSetup((card) => card === this)
            ]
        });
    }
}

WarElephants.code = '26576';
WarElephants.version = '1.0.1';

export default WarElephants;
