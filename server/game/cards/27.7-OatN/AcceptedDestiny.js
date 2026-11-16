import DrawCard from '../../drawcard.js';

class AcceptedDestiny extends DrawCard {
    // Accepted Destiny (27508)
    // [baratheon] character only.
    // Attached character gets +1 STR for each power it has.
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'baratheon' });
        this.whileAttached({
            effect: ability.effects.dynamicStrength((card) => card.power)
        });
    }
}

AcceptedDestiny.code = '27508';
AcceptedDestiny.version = '1.0.0';

export default AcceptedDestiny;
