import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DoreaSand extends DrawCard {
    // Dorea Sand (27539)
    // Challenges Action: Return Dorea Sand to your hand. Then, if you control fewer characters than
    // each opponent, stand The Red Viper or a Sand Snake character you control. (Limit once per
    // phase.)
    setupCardAbilities(ability) {
        this.action({
            title: 'Return to hand',
            message: '{player} uses {source} to return {source} to their hand',
            phase: 'challenge',
            limit: ability.limit.perPhase(1),
            gameAction: GameActions.returnCardToHand((context) => ({
                card: context.source
            })).then({
                condition: (context) =>
                    context.game
                        .getOpponents(context.player)
                        .every(
                            (opponent) =>
                                opponent.getNumberOfCardsInPlay({ type: 'character' }) >
                                context.player.getNumberOfCardsInPlay({ type: 'character' })
                        ),
                target: {
                    type: 'select',
                    cardCondition: (card, context) =>
                        card.location === 'play area' &&
                        card.getType() === 'character' &&
                        card.controller === context.player &&
                        (card.name === 'The Red Viper' || card.hasTrait('Sand Snake')),
                    gameAction: GameActions.standCard((context) => ({ card: context.target }))
                },
                message: 'Then {player} stands {target}'
            })
        });
    }
}

DoreaSand.code = '27539';
DoreaSand.version = '1.0.2';

export default DoreaSand;
