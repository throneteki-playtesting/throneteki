import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ChildrenOfTheForest extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Return card from discard pile',
            cost: ability.costs.discardFromHand(
                (card) =>
                    card.getType() !== 'event' && this.hasMatchingCardInDiscard(card.getType())
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
            message:
                '{player} uses {source} and discards {costs.discardFromHand} to return {target} from their discard pile to their hand',
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
ChildrenOfTheForest.version = '1.0.1';

export default ChildrenOfTheForest;
