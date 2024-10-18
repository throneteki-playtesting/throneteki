import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class GoodAsGold extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.challengeType === 'intrigue'
            },
            message: {
                format: '{player} plays {source} to gain {amount} gold',
                args: { amount: (context) => this.getAmount(context) }
            },
            gameAction: GameActions.gainGold((context) => ({
                player: context.player,
                amount: this.getAmount(context)
            }))
        });
    }

    getAmount(context) {
        return Math.floor(context.player.shadows.length / 2);
    }
}

GoodAsGold.code = '26535';
GoodAsGold.version = '1.0.0';

export default GoodAsGold;
