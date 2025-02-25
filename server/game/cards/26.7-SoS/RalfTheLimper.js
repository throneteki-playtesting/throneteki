import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RalfTheLimper extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDiscarded: (event) =>
                    event.card.controller !== this.controller &&
                    event.originalLocation === 'draw deck'
            },
            target: {
                cardCondition: { location: 'play area', controller: 'current', shadow: true }
            },
            message: '{player} uses {source} to return {target} to shadows',
            limit: ability.limit.perRound(2),
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

RalfTheLimper.code = '26513';
RalfTheLimper.version = '1.0.2';

export default RalfTheLimper;
