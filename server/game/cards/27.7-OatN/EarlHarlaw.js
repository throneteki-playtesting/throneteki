import DrawCard from '../../drawcard.js';

class EarlHarlaw extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            effect: ability.effects.discardsReserveAtRandom()
        });
    }
}

EarlHarlaw.code = '27514';
EarlHarlaw.version = '1.1.0';

export default EarlHarlaw;
