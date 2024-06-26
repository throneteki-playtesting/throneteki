import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class LysaArryn extends DrawCard {
    setupCardAbilities() {
        this.interrupt({
            when: {
                onCharacterKilled: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card !== this &&
                    ['character', 'attachment', 'location'].includes(card.getType())
            },
            message: '{player} uses {source} to remove {target} from the game',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.removeFromGame((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

LysaArryn.code = '15039';

export default LysaArryn;
