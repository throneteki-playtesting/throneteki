import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class BrightwaterCommander extends DrawCard {
    // Brightwater Commander (27589)
    // Reaction: After you win a challenge in which Brightwater Commander is attacking, reveal 1
    // card from your hand, and place it into shadows. (Limit once per phase.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player && context.source.isAttacking()
            },
            target: {
                type: 'select',
                cardCondition: (card, context) =>
                    card.location === 'hand' && card.controller === context.player,
                gameAction: GameActions.revealCards((context) => ({
                    cards: [context.target]
                })).then({
                    message: 'Then {player} places {target} in shadows',
                    gameAction: GameActions.putIntoShadows((context) => ({
                        card: context.parentContext.target
                    }))
                })
            },
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to reveal {target} from their hand'
        });
    }
}

BrightwaterCommander.code = '27589';
BrightwaterCommander.version = '1.0.0';

export default BrightwaterCommander;
