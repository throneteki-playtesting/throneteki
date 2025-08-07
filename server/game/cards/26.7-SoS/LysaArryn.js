import DrawCard from '../../drawcard.js';

class LysaArryn extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) =>
                card.controller === this.controller &&
                card.getType() === 'character' &&
                card.hasTrait('House Arryn'),
            effect: ability.effects.setLoyalty(true)
        });

        this.persistentEffect({
            condition: () => this.controller.getInitiative() === 0,
            match: this,
            effect: ability.effects.dynamicKeywordSources(
                (card) =>
                    card.controller === this.controller &&
                    card.getType() === 'character' &&
                    card.isLoyal()
            )
        });
    }
}

LysaArryn.code = '26597';
LysaArryn.version = '1.1.1';

export default LysaArryn;
