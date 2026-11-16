import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';

class SightOfTheThreeEyedCrow extends AgendaCard {
    // Sight of the Three-Eyed Crow (27618)
    // Your deck cannot include more than 1 copy of each card (by title).
    // Reaction: After you play an event or a card enters play under your control, search your deck
    // for a card of the same cardtype and equal or lower printed cost, reveal it, and add it to
    // your hand. Shuffle your deck. (Limit once per round.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event, context) =>
                    context.player === event.card.controller && event.card.getType() !== 'plot',
                onCardPlayed: (event, context) => context.player === event.player
            },
            gameAction: GameActions.search({
                title: 'Select a card',
                match: {
                    condition: (card, context) =>
                        card.getType() === context.event.card.getType() &&
                        card.getPrintedCost() <= context.event.card.getPrintedCost()
                },
                message: '{player} {gameAction}',
                gameAction: GameActions.addToHand((context) => ({
                    card: context.searchTarget
                }))
            }),
            limit: ability.limit.perRound(1)
        });
    }
}

SightOfTheThreeEyedCrow.code = '27618';
SightOfTheThreeEyedCrow.version = '1.0.1';

export default SightOfTheThreeEyedCrow;
