import DrawCard from '../../drawcard.js';

class QueenOfMeereen extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: ['Lady'] });
        this.whileAttached({
            effect: ability.effects.addKeyword('Queen')
        });
        this.action({
            title: 'Discard to reduce',
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {source} to discard any number of cards from their hand',
            handler: (context) => {
                this.game.promptForSelect(context.player, {
                    type: 'select',
                    mode: 'unlimited',
                    activePromptTitle: 'Select cards',
                    source: context.source,
                    context: context,
                    cardCondition: (card, context) =>
                        card.isMatch({ location: 'hand' }) && card.controller === context.player,
                    onSelect: (player, cards) => {
                        const reduction = cards.length * 2;
                        this.untilEndOfPhase((ability) => ({
                            targetController: 'current',
                            effect: ability.effects.reduceNextMarshalledAmbushedOrOutOfShadowsCardCost(
                                reduction
                            )
                        }));
                        this.game.addMessage(
                            '{0} discards {1} to reduce the cost of the next card they marshal, ambush or bring out of shadows this phase by {2}',
                            context.player,
                            cards,
                            reduction
                        );
                        return true;
                    }
                });
            }
        });
    }
}

QueenOfMeereen.code = '26579';
QueenOfMeereen.version = '1.0.1';

export default QueenOfMeereen;
