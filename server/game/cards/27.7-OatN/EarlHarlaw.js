import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class EarlHarlaw extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: {
                    aggregateBy: (event) => ({
                        controller: event.cardStateWhenDiscarded.controller,
                        source: event.source
                    }),
                    condition: (aggregate) => aggregate.source === 'reserve'
                }
            },
            message: {
                format: "{player} uses {source} to discard {amount} cards from {opponent}'s deck",
                args: {
                    amount: (context) => context.aggregate.events.length,
                    opponent: (context) => context.aggregate.controller
                }
            },
            gameAction: GameActions.discardTopCards((context) => ({
                player: context.aggregate.controller,
                amount: context.aggregate.events.length
            }))
        });
    }
}

EarlHarlaw.code = '27514';
EarlHarlaw.version = '1.0.0';

export default EarlHarlaw;
