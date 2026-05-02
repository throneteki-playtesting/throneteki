import DrawCard from '../../drawcard.js';

class SkirlingPass extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => !this.kneeled,
            targetController: 'any',
            match: (card) => card.getType() === 'character' && !card.hasTrait('Wildling'),
            effect: ability.effects.removeKeyword('stealth')
        });
    }
}

SkirlingPass.code = '27557';
SkirlingPass.version = '1.0.0';

export default SkirlingPass;
