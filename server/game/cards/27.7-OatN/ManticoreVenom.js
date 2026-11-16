import DrawCard from '../../drawcard.js';

class ManticoreVenom extends DrawCard {
    // Manticore Venom (27544)
    // Shadow (2).
    // Opponent's character only. Terminal.
    // Attached character loses a [military], an [intrigue] and a [power] icon.
    setupCardAbilities(ability) {
        this.attachmentRestriction({ controller: 'opponent' });
        this.whileAttached({
            effect: [
                ability.effects.removeIcon('military'),
                ability.effects.removeIcon('intrigue'),
                ability.effects.removeIcon('power')
            ]
        });
    }
}

ManticoreVenom.code = '27544';
ManticoreVenom.version = '1.1.0';

export default ManticoreVenom;
