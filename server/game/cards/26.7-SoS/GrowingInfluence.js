import DrawCard from '../../drawcard.js';

class GrowingInfluence extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            when: {
                onCardAbilityInitiated: (event) =>
                    event.source.controller !== this.controller &&
                    ['character', 'location'].includes(event.source.getType()) &&
                    event.ability.isTriggeredAbility()
            },
            cost: ability.costs.giveGold(1, (context) => context.event.source.controller),
            message: {
                format: '{player} plays {source} and gives {opponent} 2 gold to cancel {card}',
                args: {
                    opponent: (context) => context.event.source.controller,
                    card: (context) => context.event.source
                }
            },
            handler: () => {
                this.cancel();
            }
        });
    }
}

GrowingInfluence.code = '26596';
GrowingInfluence.version = '1.1.1';

export default GrowingInfluence;
