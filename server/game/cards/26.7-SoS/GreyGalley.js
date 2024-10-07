import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class GreyGalley extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            reserve: 1
        });
        this.action({
            title: 'Kneel and sacrifice to place in shadows',
            phase: 'dominance',
            target: {
                type: 'select',
                cardCondition: {
                    type: 'character',
                    location: 'play area',
                    printedStrengthOrLower: 3,
                    controller: 'current'
                }
            },
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            message:
                '{player} kneels and sacrifices {costs.sacrifice} to place {target} in shadows',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

GreyGalley.code = '26558';
GreyGalley.version = '1.0.0';

export default GreyGalley;
