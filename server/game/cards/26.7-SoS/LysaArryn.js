import DrawCard from '../../drawcard.js';

class LysaArryn extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.controller.getInitiative() === 0 &&
                this.controller.anyCardsInPlay(
                    (card) =>
                        card.isParticipating() &&
                        (card.isLoyal() || card.hasTrait('House Arryn')) &&
                        card.getType() === 'character'
                ),
            effect: ability.effects.contributeCharacterStrength(this)
        });
    }
}

LysaArryn.code = '26597';
LysaArryn.version = '1.0.0';

export default LysaArryn;
