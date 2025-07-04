import DrawCard from '../../drawcard.js';

class LysaArryn extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.controller.getInitiative() === 0,
            match: this,
            effect: ability.effects.dynamicKeywordSources(
                (card) =>
                    card.controller === this.controller &&
                    card.getType() === 'character' &&
                    (card.isLoyal() || card.hasTrait('House Arryn'))
            )
        });
    }
}

LysaArryn.code = '26597';
LysaArryn.version = '1.1.0';

export default LysaArryn;
