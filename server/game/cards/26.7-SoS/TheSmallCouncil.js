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
                    condition: (card, context) =>
                        GameActions.gainPower({ card, amount: this.getAmount(context) }).allow()
                }
            },
            message: {
                format: '{player} uses {source} and kneels their faction card to have {target} gain {amount} power',
                args: { amount: (context) => this.getAmount(context) }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.gainPower((context) => ({
                        card: context.target,
                        amount: this.getAmount(context)
                    })),
                    context
                );
            }
        });
    }

    getAmount(context) {
        return context.player.anyCardsInPlay({ type: 'character', trait: ['King', 'Queen'] })
            ? 2
            : 1;
    }
}

TheSmallCouncil.code = '26619';
TheSmallCouncil.version = '1.0.0';

export default TheSmallCouncil;
