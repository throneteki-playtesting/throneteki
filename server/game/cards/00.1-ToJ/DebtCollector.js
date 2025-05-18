import DrawCard from '../../drawcard.js';

class DebtCollector extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Move 1 gold to gain insight',
            limit: ability.limit.perPhase(1),
            //TODO BD move gold instead of discard
            cost: ability.costs.discardGoldFromCard(
                1,
                (card) => card.getType() === 'character' && card.controller === this.controller
            ),
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

DebtCollector.code = '00167';

export default DebtCollector;
