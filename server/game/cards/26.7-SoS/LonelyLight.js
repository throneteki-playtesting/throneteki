import DrawCard from '../../drawcard.js';

class LonelyLight extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.immuneTo((card) => card.getType() === 'event')
        });
        this.persistentEffect({
            targetController: 'any',
            effect: ability.effects.increaseCost({
                playingTypes: ['outOfShadows'],
                amount: 1
            })
        });
    }
}

LonelyLight.code = '26521';
LonelyLight.version = '1.0.0';

export default LonelyLight;
