import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AToastToTheKing extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onPhaseEnded: (event) => event.phase === 'challenge'
            },
            max: ability.limit.perPhase(1),
            message: {
                format: '{player} plays {source} to gain {amount} power for their faction',
                args: { amount: (context) => this.getAmount(context) }
            },
            gameAction: GameActions.gainPower((context) => ({ amount: this.getAmount(context) }))
        });
    }

    getAmount(context) {
        return Math.min(
            context.game.getNumberOfCardsInPlay(
                (card) => card.getType() === 'character' && card.getNumberOfIcons() === 0
            ),
            5
        );
    }
}

AToastToTheKing.code = '26547';
AToastToTheKing.version = '1.0.0';

export default AToastToTheKing;
