import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ShadowCitySepton extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onDominanceDetermined: (event) => event.winner && event.winner !== this.controller
            },
            target: {
                choosingPlayer: (player, context) => player === context.event.winner,
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    !card.kneeled &&
                    card.controller === context.event.winner
            },
            message: {
                format: '{player} uses {source} to force {opponent} to return {target} to their hand',
                args: {
                    opponent: (context) => context.event.winner
                }
            },
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
ShadowCitySepton.version = '1.1.1';

export default ShadowCitySepton;
