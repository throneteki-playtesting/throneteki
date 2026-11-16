import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WritInInk extends DrawCard {
    // Writ in Ink (27523)
    // Action: During an [intrigue] challenge, choose a House Harlaw character you control with a
    // [military] icon and have it participate in the challenge on your side.
    setupCardAbilities(ability) {
        this.action({
            title: 'Add to challenge',
            cost: ability.costs.playEvent(),
            condition: (context) => context.game.isDuringChallenge({ challengeType: 'intrigue' }),
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.player &&
                    card.hasIcon('military') &&
                    card.hasTrait('House Harlaw'),
                gameAction: GameActions.addToChallenge((context) => ({
                    card: context.target,
                    player: context.player
                }))
            },
            message: '{player} plays {source} to add {target} to the challenge'
        });
    }
}

WritInInk.code = '27523';
WritInInk.version = '1.0.1';

export default WritInInk;
