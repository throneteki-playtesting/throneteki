import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class FreyTollkeeper extends DrawCard {
    // Frey Tollkeeper (27600)
    // Ambush (5).
    // Reaction: After Frey Tollkeeper enters play, choose an opponent. That player cannot win the
    // next challenge they initiate against you this phase unless they move 2 gold from their gold
    // pool to a card of your choice.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event, context) => event.card === context.source
            },
            chooseOpponent: true,
            message:
                '{player} uses {source} to prevent {opponent} from winning their next challenge against {player} unless they move 2 gold',
            gameAction: GameActions.delayedEffect((context) => ({
                duration: 'untilEndOfPhase',
                title: context.source.name,
                when: {
                    onChallengeInitiated: (event, delayedContext) =>
                        event.challenge.attackingPlayer === delayedContext.opponent &&
                        event.challenge.defendingPlayer === delayedContext.player
                },
                gameAction: GameActions.choose({
                    player: (delayedContext) => delayedContext.opponent,
                    title: 'Move 2 gold or be unable to win the challenge',
                    choices: {
                        'Move 2 gold': {
                            condition: (delayedContext) =>
                                delayedContext.opponent.getSpendableGold({
                                    player: delayedContext.opponent,
                                    activePlayer: delayedContext.player
                                }) >= 2,
                            message: '{player} moves 2 gold to a card of their opponent choice',
                            gameAction: GameActions.chooseCards({
                                player: (delayedContext) => delayedContext.player,
                                title: 'Select a card to receive 2 gold',
                                cardCondition: (card, delayedContext) =>
                                    card.location === 'play area' &&
                                    card.controller === delayedContext.player,
                                gameAction: (card) =>
                                    GameActions.transferGold((delayedContext) => ({
                                        from: delayedContext.opponent,
                                        to: card,
                                        amount: 2
                                    }))
                            })
                        },
                        'Cannot win': {
                            message: '{player} cannot win the challenge',
                            gameAction: GameActions.lastingEffect((delayedContext) => ({
                                duration: 'untilEndOfChallenge',
                                targetController: 'any',
                                match: (player) => player === delayedContext.opponent,
                                effect: ability.effects.cannotWinChallenge()
                            }))
                        }
                    }
                })
            }))
        });
    }
}

FreyTollkeeper.code = '27600';
FreyTollkeeper.version = '1.1.0';

export default FreyTollkeeper;
