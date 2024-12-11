import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TakingTheShieldIslands extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.isMatch({
                        winner: this.controller,
                        attackingPlayer: this.controller
                    }) && event.challenge.getWinnerCards().some((card) => card.hasTrait('Raider'))
            },
            message: {
                format: "{player} plays {source} to look at the top 3 cards of {loser}'s deck",
                args: { loser: (context) => context.event.challenge.loser }
            },
            handler: (context) => {
                const top3 = context.event.challenge.loser.searchDrawDeck(3);
                this.game.promptForSelect(context.player, {
                    activePromptTitle: 'Select card to discard',
                    cardCondition: (card) => top3.includes(card),
                    onSelect: (player, card) => {
                        this.game.addMessage(
                            "{0} chooses to discard {1} from {2}'s deck, and places the other cards on top of that deck in any order",
                            context.player,
                            card,
                            context.event.challenge.loser
                        );
                        const remaining = top3.filter((c) => c !== card);
                        this.game.resolveGameAction(
                            GameActions.simultaneously([
                                GameActions.discardCard({ card }),
                                ...remaining.map((card) =>
                                    GameActions.placeCard({
                                        card,
                                        player: context.player,
                                        location: 'draw deck'
                                    })
                                )
                            ]),
                            context
                        );
                        return true;
                    },
                    onCancel: () => {
                        return true;
                    }
                });
            }
        });
    }
}

TakingTheShieldIslands.code = '26524';
TakingTheShieldIslands.version = '1.0.0';

export default TakingTheShieldIslands;
