// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for Children of the Forest
// - 2026-02-28: Fixed target condition to handle undefined cost during eligibility check
// - 2026-02-28: Refactored to use message: and GameActions

import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

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
            message: {
                format: '{player} uses {source} and discards {discarded} to return {target} from their discard pile to their hand',
                args: { discarded: (context) => context.costs.discardFromHand }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.returnCardToHand((context) => ({
                        card: context.target
                    })),
                    context
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
