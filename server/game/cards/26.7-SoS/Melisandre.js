import DrawCard from '../../drawcard.js';

class Melisandre extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.isParticipating() && !card.isShadow(),
            targetController: 'any',
            effect: ability.effects.putInShadowsByStrength(-1)
        });
    }
}

Melisandre.code = '26501';
Melisandre.version = '1.3.0';

export default Melisandre;
