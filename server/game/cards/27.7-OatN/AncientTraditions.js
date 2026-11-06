import DrawCard from '../../drawcard.js';

class AncientTraditions extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () =>
                this.controller.anyCardsInPlay(
                    (card) => card.getType() === 'character' && card.hasTrait('Old Gods')
                ),
            effect: ability.effects.immuneTo(
                (card) =>
                    card.controller !== this.controller &&
                    card.getType() !== 'agenda' &&
                    card.getType() !== 'plot'
            )
        });
    }
}

AncientTraditions.code = '27567';
AncientTraditions.version = '1.0.2';

export default AncientTraditions;
