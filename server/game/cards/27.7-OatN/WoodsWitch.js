import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WoodsWitch extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDiscarded: (event) =>
                    event.cardStateWhenDiscarded.location === 'hand' &&
                    event.card.getType() === 'character' &&
                    event.cardStateWhenDiscarded.controller !== this.controller
            },
            cost: ability.costs.sacrificeSelf(),
            handler: (context) => {
                const discardedCard = context.event.card;
                const opponent = context.event.cardStateWhenDiscarded.controller;
                const cost = discardedCard.getPrintedCost();

                this.game.addMessage(
                    '{0} sacrifices {1} to force {2} to sacrifice a card of printed cost {3}',
                    this.controller,
                    this,
                    opponent,
                    cost
                );

                this.game.promptForSelect(opponent, {
                    activePromptTitle: `Select a card with printed cost ${cost} to sacrifice`,
                    cardCondition: (card) =>
                        card.location === 'play area' &&
                        card.controller === opponent &&
                        card.getPrintedCost() === cost &&
                        GameActions.sacrificeCard({ card, player: opponent }).allow(),
                    onSelect: (player, card) => this.onSacrificeSelected(player, card),
                    source: this
                });
            }
        });
    }

    onSacrificeSelected(player, card) {
        this.game.addMessage('{0} sacrifices {1}', player, card);
        this.game.resolveGameAction(GameActions.sacrificeCard({ card, player }));
        return true;
    }
}

WoodsWitch.code = '27566';
WoodsWitch.version = '1.1.0';

export default WoodsWitch;
