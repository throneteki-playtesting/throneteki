import DrawCard from '../../drawcard.js';

class StalwartShields extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isParticipating(),
            match: (card) => card.controller !== this.controller && card.hasTrait('Army'),
            effect: ability.effects.losesAllKeywords()
        });
    }
}

StalwartShields.code = '00257';

export default StalwartShields;
