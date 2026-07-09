import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ShadowCitySepton extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onDominanceDetermined: (event) => event.winner && event.winner !== this.controller
            },
            cost: ability.costs.sacrificeSelf(),
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    !card.kneeled &&
                    card.controller === context.event.winner
            },
            message: '{player} sacrifices {costs.sacrifice} to return {target} to their hand',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.returnCardToHand((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

ShadowCitySepton.code = '27542';
ShadowCitySepton.version = '1.1.0';

export default ShadowCitySepton;
