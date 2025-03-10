import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';

class TheSmallCouncil extends AgendaCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onDominanceDetermined: (event) => this.controller === event.winner
            },
            cost: ability.costs.kneelFactionCard(),
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    trait: 'Small Council',
                    kneeled: false,
                    controller: 'current',
                    condition: (card) => GameActions.gainPower({ card, amount: 1 }).allow()
                }
            },
            message:
                '{player} uses {source} and kneels their faction card to have {target} gain 1 power',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.gainPower((context) => ({
                        card: context.target,
                        amount: 1
                    })).then({
                        condition: (context) =>
                            context.player.anyCardsInPlay({
                                type: 'character',
                                trait: ['King', 'Queen']
                            }),
                        message: 'Then, {player} draws 1 card',
                        gameAction: GameActions.drawCards({ amount: 1 })
                    }),
                    context
                );
            }
        });
    }
}

TheSmallCouncil.code = '26619';
TheSmallCouncil.version = '1.0.1';

export default TheSmallCouncil;
