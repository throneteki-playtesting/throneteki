import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RalfTheLimper extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardDiscarded: (event) =>
                    event.isPillage && event.source === this && event.card.getType() === 'location'
            },
            target: {
                cardCondition: { location: 'play area', controller: 'current', shadow: true }
            },
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

RalfTheLimper.code = '26513';
RalfTheLimper.version = '1.0.0';

export default RalfTheLimper;
