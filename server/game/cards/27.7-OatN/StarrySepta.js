import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class StarrySepta extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            when: {
                onCardAbilityInitiated: (event) =>
                    event.source.getType() === 'character' &&
                    event.ability.isTriggeredAbility() &&
                    (event.ability.isForcedAbility() || event.source.controller !== this.controller)
            },
            cost: ability.costs.discardPowerFromSelf(1),
            message: {
                format: '{player} uses {source} and discards 1 power from {source} to cancel {character}',
                args: { character: (context) => context.event.source }
            },
            limit: ability.limit.perRound(1),
            gameAction: GameActions.genericHandler((context) => {
                context.event.cancel();
            })
        });
    }
}

StarrySepta.code = '27590';
StarrySepta.version = '1.0.1';

export default StarrySepta;
