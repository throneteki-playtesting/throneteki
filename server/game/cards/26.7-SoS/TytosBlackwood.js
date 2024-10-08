import DrawCard from '../../drawcard.js';

class TytosBlackwood extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            condition: () => this.isParticipating(),
            match: (card) => card.isParticipating() && card !== this,
            effect: ability.effects.blankExcludingTraits
        });
    }
}

TytosBlackwood.code = '26561';
TytosBlackwood.version = '1.0.0';

export default TytosBlackwood;
