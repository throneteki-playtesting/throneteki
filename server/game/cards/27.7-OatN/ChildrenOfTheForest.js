// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Children of the Forest
// - 2026-02-28: Fixed target condition to handle undefined cost during eligibility check

import DrawCard from '../../drawcard.js';

class ChildrenOfTheForest extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Return card from discard pile',
            cost: ability.costs.discardFromHand((card) =>
                this.hasMatchingCardInDiscard(card.getType())
            ),
            target: {
                activePromptTitle: 'Select a card to return to hand',
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.player &&
                    (!context.costs.discardFromHand ||
                        (card !== context.costs.discardFromHand &&
                            card.getType() === context.costs.discardFromHand.getType()))
            },
            limit: ability.limit.perRound(1),
            handler: (context) => {
                context.player.moveCard(context.target, 'hand');
                this.game.addMessage(
                    '{0} uses {1} and discards {2} to return {3} from their discard pile to their hand',
                    context.player,
                    this,
                    context.costs.discardFromHand,
                    context.target
                );
            }
        });
    }

    hasMatchingCardInDiscard(cardType) {
        return this.controller.discardPile.some((card) => card.getType() === cardType);
    }
}

ChildrenOfTheForest.code = '27601';
ChildrenOfTheForest.version = '1.0.0';

export default ChildrenOfTheForest;
