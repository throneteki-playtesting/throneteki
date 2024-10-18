import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheBlackGate extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Sacrifice character',
            cost: ability.costs.kneelSelf(),
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    faction: 'thenightswatch',
                    condition: (card) => GameActions.sacrificeCard({ card }).allow()
                }
            },
            message: '{player} kneels {costs.kneel} to sacrifice {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.sacrificeCard((context) => ({ card: context.target })).then({
                        target: {
                            cardCondition: {
                                location: ['hand', 'shadows'],
                                type: 'character',
                                trait: context.parentContext.target.getTraits(),
                                condition: (card, context) =>
                                    card.getPrintedCost() <
                                    context.parentContext.target.getPrintedCost()
                            }
                        },
                        message: {
                            format: 'Then, {player} puts {target} into play from {location}',
                            args: { location: (context) => context.target.location }
                        },
                        handler: (context) => {
                            this.game.resolveGameAction(
                                GameActions.putIntoPlay((context) => ({ card: context.target })),
                                context
                            );
                        }
                    }),
                    context
                );
            }
        });
    }
}

TheBlackGate.code = '26557';
TheBlackGate.version = '1.0.0';

export default TheBlackGate;
