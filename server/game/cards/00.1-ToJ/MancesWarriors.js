import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MancesWarriors extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isParticipating()
            },
            message: "{player} uses {source} to reveal the top cards of each player's deck",
            gameAction: GameActions.revealCards((context) => ({
                cards: context.game.getPlayers().map((player) => player.drawDeck[0]),
                player: context.player,
                whileRevealed: GameActions.choose({
                    choices: {
                        'Discard revealed cards': {
                            message: '{player} chooses to have the revealed cards discarded',
                            gameAction: GameActions.simultaneously((context) =>
                                context.revealed.map((card) =>
                                    GameActions.discardCard({ card, source: this })
                                )
                            )
                        },
                        'Each player draw 1 card': {
                            message: '{player} chooses to have each player draw 1 card',
                            gameAction: GameActions.simultaneously(
                                this.game.getPlayers().map((player) =>
                                    GameActions.drawCards({
                                        player: player,
                                        amount: 1,
                                        source: this
                                    })
                                )
                            )
                        }
                    }
                })
            }))
        });
    }
}

MancesWarriors.code = '00208';

export default MancesWarriors;
