import DrawCard from '../../drawcard.js';

class AncientTraditions extends DrawCard {
    // Ancient Traditions (27567)
    // While you control an Old Gods character, attached character gains "immune to opponent's
    // non-agenda, non-plot card effects."
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: (context) =>
                context.source.controller.anyCardsInPlay(
                    (card) => card.getType() === 'character' && card.hasTrait('Old Gods')
                ),
            effect: ability.effects.immuneTo(
                (card, _abilityContext, context) =>
                    card.controller !== context.source.controller &&
                    card.getType() !== 'agenda' &&
                    card.getType() !== 'plot'
            )
        });
    }
}

AncientTraditions.code = '27567';
AncientTraditions.version = '1.0.2';

export default AncientTraditions;
