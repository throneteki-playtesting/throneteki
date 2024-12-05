import GameAction from './GameAction.js';

class TransferGold extends GameAction {
    constructor() {
        super('transferGold');
    }

    canChangeGameState({ source, amount, activePlayer }) {
        const game = source.game;
        activePlayer =
            activePlayer || (game.currentAbilityContext && game.currentAbilityContext.player);

        const availableGold =
            source.getGameElementType() === 'player'
                ? source.getSpendableGold({ player: source, activePlayer: activePlayer })
                : source.gold;

        return amount > 0 && amount <= availableGold;
    }

    createEvent({ source, target, amount, activePlayer }) {
        const game = source.game;

        activePlayer =
            activePlayer || (game.currentAbilityContext && game.currentAbilityContext.player);

        const availableGold =
            source.getGameElementType() === 'player'
                ? source.getSpendableGold({ player: source, activePlayer: activePlayer })
                : source.gold;

        let appliedAmount = Math.min(availableGold, amount);

        return this.event(
            'onGoldTransferred',
            { source, target, amount: appliedAmount, desiredAmount: amount, activePlayer },
            (event) => {
                if (event.source.getGameElementType() === 'player') {
                    game.spendGold(
                        {
                            amount: event.amount,
                            player: event.source,
                            activePlayer: event.activePlayer
                        },
                        () => {
                            event.target.modifyGold(event.amount);
                        }
                    );
                } else {
                    event.source.modifyGold(-event.amount);
                    event.target.modifyGold(event.amount);
                }
            }
        );
    }
}

export default new TransferGold();
