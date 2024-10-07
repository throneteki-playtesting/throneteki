import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class QartheenGalley extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            initiative: 1
        });
        this.action({
            title: 'Place card in shadow',
            phase: 'taxation',
            target: {
                cardCondition: {
                    location: 'discard pile',
                    controller: 'current',
                    condition: (card) => card.hasShadow()
                }
            },
            cost: [ability.costs.kneelSelf(), ability.costs.shuffleSelfIntoDeck()],
            message:
                '{player} kneels {costs.kneel} and shuffles it into their deck to place {target} in shadows from their discard pile',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

QartheenGalley.code = '26582';
QartheenGalley.version = '1.0.0';

export default QartheenGalley;
