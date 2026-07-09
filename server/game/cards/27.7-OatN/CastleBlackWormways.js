import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class CastleBlackWormways extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({ reserve: 1 });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: {
                    type: 'character',
                    location: 'play area',
                    controller: 'current'
                }
            },
            message: '{player} uses {source} to return {target} to shadows',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows({ card: context.target }),
                    context
                );
            }
        });
    }
}

CastleBlackWormways.code = '27558';
CastleBlackWormways.version = '1.0.1';

export default CastleBlackWormways;
