import DrawCard from '../../drawcard.js';

class ManticoreVenom extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ controller: 'opponent' });
        this.whileAttached({
            match: (card) => card.getNumberOfIcons() === 0,
            effect: ability.effects.blankExcludingTraits
        });
    }
}

ManticoreVenom.code = '27544';
ManticoreVenom.version = '1.0.0';

export default ManticoreVenom;
