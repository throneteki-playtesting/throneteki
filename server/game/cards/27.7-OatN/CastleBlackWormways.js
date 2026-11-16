import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class CastleBlackWormways extends DrawCard {
    // Castle Black Wormways (27558)
    // Shadow (1).
    // Reaction: After Castle Black Wormways comes out of shadows, kneel it to choose a character
    // you control and return it to shadows.
    // +1 Reserve.
    setupCardAbilities(ability) {
        this.plotModifiers({ reserve: 1 });
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) => event.card === context.source
            },
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: {
                    type: 'character',
                    location: 'play area',
                    controller: 'current'
                },
                gameAction: GameActions.putIntoShadows((context) => ({ card: context.target }))
            },
            message: '{player} uses {source} to return {target} to shadows'
        });
    }
}

CastleBlackWormways.code = '27558';
CastleBlackWormways.version = '1.0.1';

export default CastleBlackWormways;
