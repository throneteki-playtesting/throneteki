import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ChildrenOfTheForest extends DrawCard {
    // Children of the Forest (27601)
    // Insight. No attachments except Old Gods.
    // Action: Discard a non-event card from your hand to choose another card of the same cardtype
    // in your discard pile. Return that card to your hand. (Limit once per round.)
    setupCardAbilities(ability) {
        this.action({
            title: 'Return card from discard pile',
            cost: ability.costs.discardFromHand(
                (card, context) =>
                    card.getType() !== 'event' &&
                    context.player.discardPile.some(
                        (discarded) => discarded.getType() === card.getType()
                    )
            ),
            target: {
                activePromptTitle: 'Select a card to return to hand',
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.player &&
                    (!context.costs.discardFromHand ||
                        (card !== context.costs.discardFromHand &&
                            card.getType() === context.costs.discardFromHand.getType())),
                gameAction: GameActions.returnCardToHand((context) => ({ card: context.target }))
            },
            limit: ability.limit.perRound(1),
            message:
                '{player} uses {source} and discards {costs.discardFromHand} to return {target} from their discard pile to their hand'
        });
    }
}

ChildrenOfTheForest.code = '27601';
ChildrenOfTheForest.version = '1.0.1';

export default ChildrenOfTheForest;
