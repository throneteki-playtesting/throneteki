import DrawCard from '../../drawcard.js';

class UnseenInfluence extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({
            printedStrengthOrLower: 3
        });

        this.whileAttached({
            effect: ability.effects.dynamicStrength((card) =>
                card.controller.getNumberOfCardsInPlay({ printedStrengthOrLower: 3 })
            )
        });
    }
}

UnseenInfluence.code = '26592';
UnseenInfluence.version = '1.0.0';

export default UnseenInfluence;
