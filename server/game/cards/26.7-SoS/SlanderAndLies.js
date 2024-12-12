import DrawCard from '../../drawcard.js';

class SlanderAndLies extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ controller: 'opponent' });
        this.whileAttached({
            effect: [ability.effects.addKeyword('renown'), ability.effects.canSpendPowerAsGold()]
        });
    }
}

SlanderAndLies.code = '26532';
SlanderAndLies.version = '1.0.0';

export default SlanderAndLies;
