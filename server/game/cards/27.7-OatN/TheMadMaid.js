import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheMadMaid extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => !this.game.getPlayers().some((player) => player.shadows.length > 0),
            match: this,
            effect: ability.effects.addKeyword('insight')
        });

        this.reaction({
            when: {
                onCardKneeled: (event) =>
                    event.card.hasTrait('House Hightower') &&
                    event.card.getType() === 'character' &&
                    this.game.getPlayers().some((player) => player.shadows.length > 0)
            },
            message: '{player} uses {source} to name a card type',
            gameAction: GameActions.choose({
                title: 'Select a card type',
                message: '{choosingPlayer} names the {choice} cardtype',
                choices: {
                    Character: this.chooseAndRevealForCardtype('character'),
                    Location: this.chooseAndRevealForCardtype('location'),
                    Attachment: this.chooseAndRevealForCardtype('attachment'),
                    Event: this.chooseAndRevealForCardtype('event')
                }
            })
        });
    }

    chooseAndRevealForCardtype(cardType) {
        return (context) => {
            this.game.promptForSelect(context.player, {
                activePromptTitle: 'Select a card',
                cardCondition: (card) => card.location === 'shadows',
                onSelect: (player, card) => {
                    const gameActions = [
                        GameActions.revealCards({ cards: [card], revealWithMessage: false })
                    ];

                    if (card.getType() === cardType) {
                        gameActions.push(GameActions.discardCard({ card }));
                        this.game.addMessage(
                            '{0} reveals and discards {1} from shadows',
                            player,
                            card
                        );
                    } else {
                        this.game.addMessage('{0} reveals {1} from shadows', player, card);
                    }
                    this.game.resolveGameAction(GameActions.simultaneously(gameActions), context);
                    return true;
                },
                onCancel: (player) => {
                    this.game.addAlert(
                        'danger',
                        '{0} does not select any cards for {1}',
                        player,
                        this
                    );
                    return true;
                }
            });
        };
    }
}

TheMadMaid.code = '27586';
TheMadMaid.version = '1.0.0';

export default TheMadMaid;
