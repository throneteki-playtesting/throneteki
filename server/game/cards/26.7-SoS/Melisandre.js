import DrawCard from '../../drawcard.js';
import GenericTracker from '../../EventTrackers/GenericTracker.js';
import GameActions from '../../GameActions/index.js';

class Melisandre extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = GenericTracker.forRound(this.game, 'onCardOutOfShadows');

        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    this.tracker.some((event) => event.card === card) &&
                    GameActions.putIntoShadows({ card }).allow()
            },
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to return {target} to shadows',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

Melisandre.code = '26501';
Melisandre.version = '1.1.0';

export default Melisandre;
