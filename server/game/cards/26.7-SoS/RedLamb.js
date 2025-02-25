import DrawCard from '../../drawcard.js';

class RedLamb extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.controller.anyCardsInPlay({ name: 'Ser Barristan Selmy' }),
            match: this,
            effect: [ability.effects.addIcon('power'), ability.effects.addTrait('knight')]
        });
    }
}

RedLamb.code = '26575';
RedLamb.version = '1.0.1';

export default RedLamb;
