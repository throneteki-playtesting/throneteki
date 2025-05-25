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
                format: "{player} plays {source} to look {loser}'s hand",
                args: { loser: (context) => context.event.challenge.loser }
            },
            handler: (context) => {
                const numCards = context.cardStateWhenInitiated.location === 'shadows' ? 2 : 1;
                this.game.promptForSelect(context.player, {
                    activePromptTitle: numCards === 1 ? 'Select a card' : 'Select up to 2 cards',
                    source: this,
                    numCards,
                    revealTargets: true,
                    cardCondition: (card) =>
                        card.location === 'hand' &&
                        card.controller === context.event.challenge.loser,
                    onSelect: (player, cards) => this.onCardsSelected(player, cards)
                });
            }
        });
    }

    onCardsSelected(player, cards) {
        this.game.resolveGameAction(
            GameActions.simultaneously(
                cards.map((card) =>
                    GameActions.placeCard({
                        card,
                        player,
                        location: 'draw deck'
                    })
                )
            )
        );
        this.game.addMessage(
            "{0} then uses {1} to place {2} on top of {3}'s deck",
            player,
            this,
            cards,
            cards[0].controller
        );

        return true;
    }
}

TakingTheShieldIslands.code = '26524';
TakingTheShieldIslands.version = '1.1.0';

export default TakingTheShieldIslands;
