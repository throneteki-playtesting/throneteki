import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';
import { Tokens } from '../../Constants/Tokens.js';

class TheIronBankOfBraavos extends AgendaCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Kneel your faction card',
            cost: ability.costs.kneelFactionCard(),
            choices: {
                'Reduce cost': () => {
                    this.game.addMessage(
                        '{0} uses {1} to kneel their faction card and reduce the cost of the next bestow card by 1',
                        this.controller,
                        this
                    );
                    this.untilEndOfPhase((ability) => ({
                        targetController: 'current',
                        effect: ability.effects.reduceNextMarshalledOrPlayedCardCost(1, (card) =>
                            card.hasKeyword('bestow')
                        )
                    }));
                },
                'Move gold': {
                    target: {
                        cardCondition: (card) =>
                            card.location === 'play area' &&
                            card.controller === this.controller &&
                            card.hasToken(Tokens.gold)
                    },
                    gameAction: GameActions.genericHandler((context) => {
                        this.game.addMessage(
                            '{0} uses {1} to kneel their faction card and move 1 gold from {2} to their gold pool',
                            this.controller,
                            this,
                            context.target
                        );
                        this.game.transferGold({
                            from: context.target,
                            to: this.context.player,
                            amount: 1
                        });
                    })
                }
            }
        });
    }
}

TheIronBankOfBraavos.code = '00360';

export default TheIronBankOfBraavos;
