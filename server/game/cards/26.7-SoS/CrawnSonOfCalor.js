import DrawCard from '../../drawcard.js';

class CrawnSonOfCalor extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            location: 'any',
            targetController: 'current',
            effect: ability.effects.canMarshalIntoShadows(
                (card) => card === this && card.location === 'discard pile'
            )
        });
    }
}

CrawnSonOfCalor.code = '26525';
CrawnSonOfCalor.version = '1.0.0';

export default CrawnSonOfCalor;
