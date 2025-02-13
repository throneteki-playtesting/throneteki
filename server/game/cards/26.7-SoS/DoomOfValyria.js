import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';
import TextHelper from '../../TextHelper.js';

class DoomOfValyria extends PlotCard {
    setupCardAbilities() {
        this.chosenCards = [];
        this.whenRevealed({
            handler: (context) => {
                // Draw up to 3, if able
                this.game.getPlayersInFirstPlayerOrder().forEach((player) => {
                    const amount = this.getAmountToDraw(player);
                    if (amount > 0) {
                        this.game.resolveGameAction(GameActions.drawCards({ player, amount }));
                        this.game.addMessage('{0} draws {1} cards for {2}', player, amount, this);
                    }
                });
                // Select X cards to discard
                this.game.getPlayersInFirstPlayerOrder().forEach((player, index, arr) => {
                    const lastPlayer = arr.length - 1 === index;
                    this.game.promptForSelect(player, {
                        type: 'select',
                        mode: 'unlimited',
                        activePromptTitle: 'Select cards to discard',
                        source: context.source,
                        cardCondition: (card) =>
                            card.isMatch({ location: 'hand' }) && card.controller === player,
                        onSelect: (player, discarded) => {
                            const xValue = discarded.length;
                            // Select X cards (can be 0)
                            if (xValue > 0) {
                                this.game.promptForSelect(player, {
                                    mode: 'exactly',
                                    numCards: xValue,
                                    activePromptTitle: `Select ${TextHelper.count(xValue, 'card')}`,
                                    source: context.source,
                                    cardCondition: (card) => card.location === 'play area',
                                    onSelect: (player, chosen) => {
                                        this.game.addMessage(
                                            `{0} discards {1} to choose {2} for {3}`,
                                            player,
                                            discarded,
                                            chosen,
                                            this
                                        );
                                        this.chooseCards(lastPlayer, discarded, chosen);

                                        return true;
                                    }
                                });
                            }

                            return true;
                        },
                        onCancel: (player) => {
                            this.game.addMessage(
                                `{0} does not discard any cards for {1}`,
                                player,
                                this
                            );
                            this.chooseCards(lastPlayer);
                            return true;
                        }
                    });
                });
            }
        });
    }

    getAmountToDraw(player) {
        return Math.max(0, 3 - player.getHandCount());
    }

    chooseCards(lastPlayer, discarded = [], chosen = []) {
        this.game.resolveGameAction(
            GameActions.simultaneously(discarded.map((card) => GameActions.discardCard({ card })))
        );
        this.chosenCards.push(...chosen);
        if (lastPlayer) {
            const discarding = this.game.filterCardsInPlay(
                (card) => !this.chosenCards.includes(card)
            );
            if (discarding.length > 0) {
                // Discard all not chosen
                this.game.addMessage('{0} are discarded from play for {1}', discarding, this);
                this.game.resolveGameAction(
                    GameActions.simultaneously(() =>
                        discarding.map((card) => GameActions.discardCard({ card }))
                    )
                );
            }
        }
    }
}

DoomOfValyria.code = '26612';
DoomOfValyria.version = '1.1.0';

export default DoomOfValyria;
