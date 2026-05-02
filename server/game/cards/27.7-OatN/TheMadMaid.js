import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheMadMaid extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                !this.game
                    .getOpponents(this.controller)
                    .some((opponent) => opponent.shadows.length > 0),
            match: this,
            effect: ability.effects.addKeyword('insight')
        });

        this.reaction({
            when: {
                onCardKneeled: (event) =>
                    event.card.hasTrait('House Hightower') && event.card.getType() === 'character'
            },
            message: '{player} uses {source} to name a card type',
            gameAction: GameActions.choose({
                title: 'Select a card type',
                message: '{choosingPlayer} names the {choice} cardtype',
                choices: {
                    Character: this.chooseAndRevealForCardtype('Character'),
                    Location: this.chooseAndRevealForCardtype('Location'),
                    Attachment: this.chooseAndRevealForCardtype('Attachment'),
                    Event: this.chooseAndRevealForCardtype('Event')
                }
            })
        });
    }

    chooseAndRevealForCardtype(cardType) {
        this.game.promptForSelect(this.controller, {
            activePrompt: 'Select a card',
            cardCondition: (card) => card.location === 'shadows',
            onSelect: (player, card) => {
                const gameActions = [GameActions.revealCards({ cards: [card] })];

                if (card.getType() === cardType) {
                    gameActions.push([GameActions.discardCard({ card })]);
                    this.game.addMessage('{0} reveals and discards {1} from shadows', player, card);
                } else {
                    this.game.addMessage('{0} reveals {1} from shadows', player, card);
                }
                this.game.resolveGameAction(GameActions.simultaneously(gameActions));
                return true;
            },
            onCancel: (player) => {
                this.game.addAlert('danger', '{0} does not select any cards for {1}', player, this);
                return true;
            }
        });
    }
}

TheMadMaid.code = '27586';
TheMadMaid.version = '1.0.0';

export default TheMadMaid;
