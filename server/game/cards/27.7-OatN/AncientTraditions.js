import DrawCard from '../../drawcard.js';

class AncientTraditions extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.modifyStrength(1)
        });
        this.whileAttached({
            condition: () => this.parent && this.parent.hasTrait('Old Gods'),
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
AncientTraditions.version = '1.0.1';

export default AncientTraditions;
