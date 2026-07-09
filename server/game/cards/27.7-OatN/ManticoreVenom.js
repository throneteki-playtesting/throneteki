import DrawCard from '../../drawcard.js';

class ManticoreVenom extends DrawCard {
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
