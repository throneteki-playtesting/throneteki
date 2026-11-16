import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheWeepingWater extends DrawCard {
    // The Weeping Water (27569)
    // Interrupt: When a character is sacrificed, kneel The Weeping Water to place that card in its
    // owner's dead pile instead of its owner's discard pile.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onSacrificed: (event) => event.card.getType() === 'character'
            },
            cost: ability.costs.kneelSelf(),
            message: {
                format: '{player} kneels {costs.kneel} to place {card} in its owner dead pile instead of their discard pile',
                args: { card: (context) => context.event.card }
            },
            gameAction: GameActions.replaceEvent((context) => ({
                event: context.event,
                replacement: GameActions.placeCard({
                    card: context.event.card,
                    location: 'dead pile'
                })
            }))
        });
    }
}

TheWeepingWater.code = '27569';
TheWeepingWater.version = '1.0.0';

export default TheWeepingWater;
