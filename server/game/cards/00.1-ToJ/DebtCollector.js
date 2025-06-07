import DrawCard from '../../drawcard.js';
import { Tokens } from '../../Constants/index.js';

class DebtCollector extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Move 1 gold to gain insight',
            limit: ability.limit.perPhase(1),
            cost: ability.costs.moveGoldFromCardToFixedTarget({
                target: this.controller,
                amount: 1,
                condition: (card) => card.getType() === 'character' &&
                    card.controller === this.controller &&
                    card.hasToken(Tokens.gold)
            }),
            handler: (context) => {
                this.game.addMessage(
                    '{0} moves 1 gold from {1} to their gold pool to give {2} insight',
                    this.controller,
                    context.costs.discardToken,
                    this
                );
                this.untilEndOfPhase((ability) => ({
                    match: this,
                    effect: ability.effects.addKeyword('insight')
                }));
            }
        });
    }
}

DebtCollector.code = '00166';

export default DebtCollector;
