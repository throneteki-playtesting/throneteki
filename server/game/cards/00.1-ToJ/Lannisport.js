import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Lannisport extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            gold: 1
        });
        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.initiatedAgainstPlayer === this.controller &&
                    event.challenge.initiatedChallengeType === 'power'
            },
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {source} to end the challenge with no winner or loser',
            handler: (context) => {
                const opponent = context.event.challenge.initiatingPlayer;
                if (opponent.hand.length < 1) {
                    this.cancelChallenge();
                    return;
                }

                this.game.promptWithMenu(opponent, this, {
                    activePrompt: {
                        menuTitle: 'Discard a card to initiate?',
                        buttons: [
                            { text: 'Yes', method: 'promptToDiscard' },
                            { text: 'No', method: 'cancelChallenge' }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    promptToDiscard(opponent) {
        this.game.promptForSelect(opponent, {
            activePrompt: 'Select a card',
            cardCondition: (card) => card.controller === opponent && card.location === 'hand',
            onSelect: (opponent, card) => this.discardSelectedCards(opponent, card),
            onCancel: () => this.cancelChallenge(),
            source: this
        });
        return true;
    }

    discardSelectedCards(opponent, card) {
        this.game.addMessage(
            '{0} discards {1} to prevent {2} from ending the challenge',
            opponent,
            card,
            this
        );
        this.game.resolveGameAction(GameActions.discardCard({ card }));
        return true;
    }

    cancelChallenge() {
        this.game.currentChallenge.cancelChallenge();
        this.game.addMessage(
            '{0} does not discard a card for {1}',
            this.game.currentChallenge.initiatingPlayer,
            this
        );
        return true;
    }
}

Lannisport.code = '00153';
Lannisport.version = '1.1.1';

export default Lannisport;
