import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RalfTheLimper extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardPlaced: (event) =>
                    event.card.getType() === 'location' &&
                    event.card.controller !== this.controller &&
                    event.location === 'discard pile'
            },
            target: {
                cardCondition: { location: 'play area', controller: 'current', shadow: true }
            },
            message: '{player} uses {source} to return {target} to shadows',
            limit: ability.limit.perPhase(2),
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
RalfTheLimper.version = '1.0.1';

export default RalfTheLimper;
