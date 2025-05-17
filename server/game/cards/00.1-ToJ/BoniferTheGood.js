import DrawCard from '../../drawcard.js';

class BoniferTheGood extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) =>
                !card.isFaction('neutral') &&
                card.hasTrait('The Seven') &&
                card.getType() === 'character',
            effect: ability.effects.addKeyword('insight')
        });
    }
}

BoniferTheGood.code = '00109';

export default BoniferTheGood;
