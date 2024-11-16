import DrawCard from '../../drawcard.js';

class Yronwood extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            when: {
                // TODO: This needs to be implemented properly (eg. not just "hasText")
                onCardAbilityInitiated: (event) =>
                    event.ability.isTriggeredAbility() &&
                    event.source.hasText('you win') &&
                    event.source.hasText('challenge') &&
                    event.player !== this.controller
            },
            cost: ability.costs.kneelSelf(),
            message: {
                format: '{player} kneels {costs.kneel} to cancel {card}',
                args: { card: (context) => context.event.source }
            },
            handler: (context) => {
                context.event.cancel();
            }
        });
    }
}

Yronwood.code = '26545';
Yronwood.version = '1.0.0';

export default Yronwood;
