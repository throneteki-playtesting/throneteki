import DrawCard from '../../drawcard.js';

class IronEmmett extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            condition: () => this.kneeled && this.game.currentPhase === 'challenge',
            effect: ability.effects.cannotPutIntoPlay((card) => card.hasIcon('military'))
        });
    }
}

IronEmmett.code = '00201';

export default IronEmmett;
