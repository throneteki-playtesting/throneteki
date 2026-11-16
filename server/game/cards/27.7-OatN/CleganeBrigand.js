import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class CleganeBrigand extends DrawCard {
    // Clegane Brigand (27529)
    // Pillage
    // Reaction: After Clegane Brigand discards a card using pillage, choose a card in the losing
    // opponent's discard pile and place it on top of their deck.
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: (event, context) =>
                    event.isPillage && event.source === context.source
            },
            target: {
                activePromptTitle: 'Select a card',
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.event.card.controller,
                gameAction: GameActions.placeCard((context) => ({
                    card: context.target,
                    location: 'draw deck'
                }))
            },
            message: {
                format: '{player} uses {source} to place {target} on top of the deck of {controller}',
                args: { controller: (context) => context.event.card.controller }
            }
        });
    }
}

CleganeBrigand.code = '27529';
CleganeBrigand.version = '2.0.1';

export default CleganeBrigand;
