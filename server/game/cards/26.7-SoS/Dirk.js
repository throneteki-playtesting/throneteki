import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Dirk extends DrawCard {
    setupCardAbilities() {
        this.forcedInterrupt({
            when: {
                onCardDiscarded: (event) =>
                    event.card.getType() === 'character' && event.card.location === 'play area'
            },
            message: {
                format: "{player} is forced by {source} to place {card} in its owner's dead pile instead of their discard pile",
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

Dirk.code = '26550';
Dirk.version = '1.0.0';

export default Dirk;
