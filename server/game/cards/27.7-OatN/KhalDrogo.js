import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class KhalDrogo extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.attackingPlayer === this.controller
            },
            target: {
                type: 'select',
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isUnique() &&
                    card.hasTrait('Dothraki')
            },
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to stand {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.standCard((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

KhalDrogo.code = '27573';
KhalDrogo.version = '1.0.2';

export default KhalDrogo;
