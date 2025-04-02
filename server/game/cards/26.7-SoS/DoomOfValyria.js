import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class DoomOfValyria extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            message: '{player} uses {source} to discard all non-limited cards from play',
            handler: (context) => {
                const opponents = this.game.getOpponentsInFirstPlayerOrder(context.player);
                this.remainingOpponents = opponents.filter((opponent) => opponent.hand.length >= 3);
                this.context = context;
                this.promptForCancel(context);
            }
        });
    }
    promptForCancel() {
        if (this.remainingOpponents.length === 0) {
            this.resolveDiscardFromPlay();
            return true;
        }

        const nextOpponent = this.remainingOpponents.shift();
        this.game.promptWithMenu(nextOpponent, this, {
            activePrompt: {
                menuTitle: 'Discard hand to cancel?',
                buttons: [
                    { text: 'Yes', method: 'cancelResolution' },
                    { text: 'No', method: 'promptForCancel' }
                ]
            },
            source: this
        });

        return true;
    }

    cancelResolution(opponent) {
        this.game.addMessage(
            '{0} discards their hand to cancel the effects of {1}',
            opponent,
            this
        );
        this.game.resolveGameAction(
            GameActions.simultaneously(() =>
                opponent.hand.map((card) => GameActions.discardCard({ card, source: this }))
            )
        );
        return true;
    }

    resolveDiscardFromPlay() {
        this.game.resolveGameAction(
            GameActions.simultaneously(() =>
                this.game
                    .filterCardsInPlay((card) => !card.isLimited())
                    .map((card) => GameActions.discardCard({ card, source: this }))
            )
        );
    }
}

DoomOfValyria.code = '26612';
DoomOfValyria.version = '1.2.0';

export default DoomOfValyria;
