import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MagisterIllyrio extends DrawCard {
    setupCardAbilities() {
        const numOfShadowCards = (context) =>
            context.game.allCards.reduce(
                (count, card) => (card.location === 'shadows' ? count + 1 : count),
                0
            );
        const amountToGain = (context) => Math.floor(numOfShadowCards(context) / 2);

        this.reaction({
            when: {
                onIncomeCollected: (event) => event.player === this.controller
            },
            message: {
                format: '{player} uses {source} to gain {amountToGain} gold',
                args: { amountToGain }
            },
            gameAction: GameActions.gainGold((context) => ({
                player: context.player,
                amount: amountToGain(context)
            }))
        });
    }
}

MagisterIllyrio.code = '26573';
MagisterIllyrio.version = '1.0.0';

export default MagisterIllyrio;
