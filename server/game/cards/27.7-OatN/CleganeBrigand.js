import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';

class CleganeBrigand extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: (event) => event.isPillage && event.source === this
            },
            target: {
                activePromptTitle: 'Select a card',
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.event.card.controller
            },
            message: {
                format: "{player} uses {source} to place {target} on top of {controller}'s deck",
                args: { controller: (context) => context.event.card.controller }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.placeCard((context) => ({
                        card: context.target,
                        location: 'draw deck'
                    })),
                    context
                );
            }
        });
    }
}

CleganeBrigand.code = '27529';
CleganeBrigand.version = '2.0.1';

export default CleganeBrigand;
