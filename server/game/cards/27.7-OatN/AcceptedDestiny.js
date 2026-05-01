import DrawCard from '../../drawcard.js';

class AcceptedDestiny extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'baratheon' });
        this.whileAttached({
            effect: ability.effects.dynamicStrength(() => parent.power)
        });
    }
}

AcceptedDestiny.code = '27508';
AcceptedDestiny.version = '1.0.0';

export default AcceptedDestiny;
