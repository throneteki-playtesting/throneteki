import DrawCard from '../../drawcard.js';

class AMeetingOfMinds extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.getType() === 'character' && card.hasTrait('Small Council'),
            targetController: 'current',
            effect: ability.effects.addKeyword('insight')
        });
    }
}

AMeetingOfMinds.code = '26605';
AMeetingOfMinds.version = '2.0.0';

export default AMeetingOfMinds;
