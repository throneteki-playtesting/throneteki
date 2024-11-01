import DrawCard from '../../drawcard.js';

class UndercitySpymaster extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.dynamicStrength(() => this.controller.shadows.length)
        });
    }
}

UndercitySpymaster.code = '26589';
UndercitySpymaster.version = '1.0.0';

export default UndercitySpymaster;
