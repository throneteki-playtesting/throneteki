import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

const anyCardsInShadows = (game) => game.getPlayers().some((player) => player.shadows.length > 0);

const revealAndDiscardIfCardType = (cardType) =>
    GameActions.chooseCards({
        title: 'Select a card',
        cardCondition: (card) => card.location === 'shadows',
        gameAction: (card) =>
            GameActions.revealCards({ cards: [card], revealWithMessage: false }).then({
                message: '{player} {gameAction}',
                gameAction: GameActions.ifCondition({
                    condition: () => card.getType() === cardType,
                    thenAction: GameActions.discardCard({ card })
                })
            })
    });

class TheMadMaid extends DrawCard {
    // The Mad Maid (27586)
    // While there are no cards in shadows, The Mad Maid gains insight.
    // Reaction: After a House Hightower character is knelt, declare a cardtype (character,
    // location, attachment, event). Then, choose and reveal a card in shadows. If that card has
    // that cardtype, discard it. (Limit twice per round.)
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) => !anyCardsInShadows(context.game),
            match: (card, context) => card === context.source,
            effect: ability.effects.addKeyword('insight')
        });

        this.reaction({
            when: {
                onCardKneeled: (event, context) =>
                    event.card.hasTrait('House Hightower') &&
                    event.card.getType() === 'character' &&
                    anyCardsInShadows(context.game)
            },
            limit: ability.limit.perRound(2),
            message: '{player} uses {source} to name a card type',
            gameAction: GameActions.choose({
                title: 'Select a card type',
                message: '{choosingPlayer} names the {choice} cardtype',
                choices: {
                    Character: revealAndDiscardIfCardType('character'),
                    Location: revealAndDiscardIfCardType('location'),
                    Attachment: revealAndDiscardIfCardType('attachment'),
                    Event: revealAndDiscardIfCardType('event')
                }
            })
        });
    }
}

TheMadMaid.code = '27586';
TheMadMaid.version = '1.0.0';

export default TheMadMaid;
