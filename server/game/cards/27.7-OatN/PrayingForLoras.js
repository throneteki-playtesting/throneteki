import DrawCard from '../../drawcard.js';

class PrayingForLoras extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            when: {
                onCharacterKilled: (event) =>
                    event.allowSave &&
                    event.card.canBeSaved() &&
                    event.card.hasTrait('Knight') &&
                    event.card.isUnique()
            },
            cost: ability.costs.kneel(
                (card) => card.hasTrait('Lady') && card.getType() === 'character'
            ),
            message: {
                format: '{player} plays {source} and kneels {costs.kneel} to save {card}',
                args: { card: (context) => context.event.card }
            },
            handler: (context) => {
                context.event.saveCard();
                this.game.addMessage(
                    '{0} plays {1} to kneel {2} to save {3}',
                    this.controller,
                    this,
                    context.costs.kneel,
                    context.event.card
                );
            }
        });
    }
}

PrayingForLoras.code = '27596';
PrayingForLoras.version = '1.0.0';

export default PrayingForLoras;
