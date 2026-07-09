import DrawCard from '../../drawcard.js';

class KingsmootClaimant extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.isAttacking() &&
                !this.controller.anyCardsInPlay(
                    (card) =>
                        card.getType() === 'character' && card.hasTrait('King') && card !== this
                ),
            match: this,
            effect: [ability.effects.addTrait('King'), ability.effects.addKeyword('Renown')]
        });
    }
}

KingsmootClaimant.code = '27517';
KingsmootClaimant.version = '1.0.1';

export default KingsmootClaimant;
