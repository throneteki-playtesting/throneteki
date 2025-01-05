import DrawCard from '../../drawcard.js';

class Lannisport extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            gold: 1
        });
        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.initiatedAgainstPlayer === this.controller &&
                    event.challenge.initiatedChallengeType === 'power'
            },
            handler: (context) => {
                const opponent = context.opponent;
                if (opponent.hand.length < 1) {
                    this.cancelChallenge();
                    return;
                }

                this.game.promptWithMenu(opponent, this, {
                    activePrompt: {
                        menuTile: 'Discard card from hand?',
                        buttons: [
                            { text: 'Yes (continue challenge)', method: 'promptToDiscard' },
                            { text: 'No (cancel challenge)', method: 'cancelChallenge' }
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
            onSelect: (opponent, cards) => this.discardSelectedCards(opponent, cards),
            onCancel: () => this.cancelChallenge(),
            source: this
        });
        return true;
    }

    discardSelectedCards(opponent, cards) {
        this.game.addMessage('{0} discards {1} for {2}', opponent, cards, this);
        opponent.discardCards(cards);
        return true;
    }

    cancelChallenge() {
        this.game.currentChallenge.cancelChallenge();
        this.game.addMessage(
            '{0} does not discard a card for {1} and cancels the challenge',
            this.game.currentChallenge.initiatingPlayer,
            this
        );
        return true;
    }
}

Lannisport.code = '26533';
Lannisport.version = '1.1.0';

export default Lannisport;
