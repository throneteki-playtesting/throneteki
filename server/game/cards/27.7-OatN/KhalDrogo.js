import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class KhalDrogo extends DrawCard {
    // Khal Drogo (27573)
    // Renown.
    // Reaction: After you win a challenge as the attacking player, choose and stand a unique
    // Dothraki character. (Limit once per phase.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    event.challenge.attackingPlayer === context.player
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isUnique() &&
                    card.hasTrait('Dothraki'),
                gameAction: GameActions.standCard((context) => ({ card: context.target }))
            },
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to stand {target}'
        });
    }
}

KhalDrogo.code = '27573';
KhalDrogo.version = '1.0.2';

export default KhalDrogo;
