import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class FreyTollkeeper extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardEntersPlay: (event) => event.card === this
            },
            chooseOpponent: true,
            message:
                '{player} uses {source} to prevent {opponent} from winning their next challenge against {player} unless they move 2 gold',
            handler: (context) => {
                const targetOpponent = context.opponent;
                const controller = this.controller;

                const challengeListener = (event) => {
                    if (
                        event.challenge.attackingPlayer !== targetOpponent ||
                        event.challenge.defendingPlayer !== controller
                    ) {
                        return;
                    }

                    this.game.removeListener('onChallengeInitiated', challengeListener);
                    this.game.removeListener('onPhaseEnded', cleanupListener);

                    if (targetOpponent.gold < 2) {
                        this.untilEndOfChallenge((ability) => ({
                            targetController: 'opponent',
                            effect: ability.effects.cannotWinChallenge()
                        }));
                        this.game.addMessage(
                            '{0} cannot afford to move 2 gold, so they cannot win this challenge for {1}',
                            targetOpponent,
                            this
                        );
                        return;
                    }

                    this.pendingOpponent = targetOpponent;

                    this.game.promptWithMenu(targetOpponent, this, {
                        activePrompt: {
                            menuTitle: `Move 2 gold to a card of ${controller.name}'s choice or cannot win the challenge?`,
                            buttons: [
                                { text: 'Move 2 gold', method: 'moveGoldToCard' },
                                { text: 'Cannot win', method: 'acceptCannotWin' }
                            ]
                        },
                        waitingPromptTitle: 'Waiting for opponent to decide'
                    });
                };

                const cleanupListener = () => {
                    this.game.removeListener('onChallengeInitiated', challengeListener);
                };

                this.game.on('onChallengeInitiated', challengeListener);
                this.game.once('onPhaseEnded', cleanupListener);
            }
        });
    }

    moveGoldToCard(player) {
        const controller = this.controller;
        this.game.promptForSelect(controller, {
            activePromptTitle: 'Select a card to receive 2 gold',
            cardCondition: (card) =>
                card.location === 'play area' && card.controller === controller,
            onSelect: (selPlayer, card) => this.receiveGold(player, card),
            source: this
        });
        return true;
    }

    receiveGold(opponent, card) {
        if (opponent.gold < 2) {
            this.game.addMessage('{0} cannot afford to pay 2 gold', opponent);
            this.applyCannotWin();
            return true;
        }

        this.game.resolveGameAction(
            GameActions.transferGold(() => ({ from: opponent, to: card, amount: 2 }))
        );
        this.game.addMessage(
            '{0} moves 2 gold to {1} and may now win the challenge',
            opponent,
            card
        );
        this.pendingOpponent = undefined;
        return true;
    }

    acceptCannotWin(player) {
        this.applyCannotWin();
        this.game.addMessage(
            '{0} accepts that they cannot win this challenge for {1}',
            player,
            this
        );
        this.pendingOpponent = undefined;
        return true;
    }

    applyCannotWin() {
        this.untilEndOfChallenge((ability) => ({
            targetController: 'opponent',
            effect: ability.effects.cannotWinChallenge()
        }));
    }
}

FreyTollkeeper.code = '27600';
FreyTollkeeper.version = '1.1.0';

export default FreyTollkeeper;
