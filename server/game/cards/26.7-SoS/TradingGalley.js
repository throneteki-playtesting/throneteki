import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TradingGalley extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card.controller === this.controller
            },
            chooseOpponent: true,
            cost: ability.costs.kneelSelf(),
            message:
                '{player} kneels {costs.kneel} to gain 3 gold and give control of {source} to {opponent}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously([
                        GameActions.gainGold((context) => ({ player: context.player, amount: 3 })),
                        GameActions.takeControl((context) => ({
                            card: this,
                            player: context.opponent
                        }))
                    ]),
                    context
                );
            }
        });
    }
}

TradingGalley.code = '26594';
TradingGalley.version = '1.0.0';

export default TradingGalley;
