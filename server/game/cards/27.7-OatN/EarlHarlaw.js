import DrawCard from '../../drawcard.js';

class EarlHarlaw extends DrawCard {
    // Earl Harlaw (27514)
    // Each player discards cards for reserve at random.
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
