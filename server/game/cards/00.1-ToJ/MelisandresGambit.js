import PlotCard from '../../plotcard.js';
import GameActions from '../../GameActions/index.js';

class MelisandresGambit extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            target: {
                type: 'select',
                mode: 'upTo',
                numCards: 1,
                cardCondition: (card, context) =>
                    card.getType() === 'character' &&
                    card.location === 'play area' &&
                    card.controller === context.player,
                gameAction: 'kill'
            },
            handler: (context) => {
                if (context.target.length > 0) {
                    this.game.killCharacter(context.target[0], { allowSave: false });

                    this.targetPredicate = (card) =>
                        card !== context.target &&
                        card.controller === this.controller &&
                        card.getType() === 'character' &&
                        ['discard pile', 'dead pile'].includes(card.location) &&
                        this.controller.canPutIntoPlay(card);

                    if (this.game.allCards.some(this.targetPredicate)) {
                        this.game.promptForSelect(this.controller, {
                            source: this,
                            cardCondition: this.targetPredicate,
                            onSelect: (card) => this.onCardSelected(card),
                            onCancel: () => this.cancelSelection()
                        });
                    }
                } else {
                    this.game.addMessage(
                        '{0} does not select a character to kill for {1}',
                        this.controller,
                        this
                    );
                }
            }
        });
    }

    cancelSelection() {
        this.game.addAlert(
            'danger',
            '{0} does not select a character to put into play with {1}',
            this.controller,
            this
        );
        return true;
    }

    onCardSelected(card) {
        this.selections.push({ player: this.controller, card: card });
        this.game.addMessage(
            '{0} selects {1} to put into play with {2}',
            this.controller,
            card,
            this
        );

        return true;
    }
}

MelisandresGambit.code = '00336';

export default MelisandresGambit;
