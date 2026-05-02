import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheWeepingWater extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onSacrificed: (event) => event.card.getType() === 'character'
            },
            cost: ability.costs.kneelSelf(),
            message: {
                format: "{player} kneels {costs.kneel} to place {card} in it's owners dead pile instead of their discard pile",
                args: { card: (context) => context.event.card }
            },
            handler: (context) => {
                context.event.replaceHandler(() => {
                    this.game.resolveGameAction(
                        GameActions.placeCard((context) => ({
                            card: context.event.card,
                            location: 'dead pile'
                        })),
                        context
                    );
                });
            }
        });
    }
}

TheWeepingWater.code = '27569';
TheWeepingWater.version = '1.0.0';

export default TheWeepingWater;
