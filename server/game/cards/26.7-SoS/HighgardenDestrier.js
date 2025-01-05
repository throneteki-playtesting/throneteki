import DrawCard from '../../drawcard.js';

class HighgardenDestrier extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction(
            (card) =>
                card.getType() === 'character' &&
                card.hasPrintedStrength() &&
                card.getPrintedStrength() <= 3 &&
                card.attachments.every(
                    (attachment) => attachment === this || attachment.name !== 'Highgarden Destrier'
                )
        );

        this.whileAttached({
            effect: ability.effects.dynamicStrength((card) =>
                card.controller.getNumberOfCardsInPlay({ printedCostOrLower: 3 })
            )
        });
    }
}

HighgardenDestrier.code = '26592';
HighgardenDestrier.version = '2.0.0';

export default HighgardenDestrier;
