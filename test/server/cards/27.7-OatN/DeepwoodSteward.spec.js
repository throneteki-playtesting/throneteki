// Claude: dragCard Kingsroad to deck ensures non-empty deck (Search.canChangeGameState requires drawDeck.length > 0)
describe('Deepwood Steward', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Deepwood Steward (OatN)',
                'The Kingsroad',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('baratheon', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.steward = this.player1.findCardByName('Deepwood Steward', 'hand');
            this.kingsroad = this.player1.findCardByName('The Kingsroad', 'hand');

            this.completeSetup();
            this.selectFirstPlayer(this.player1);
        });

        describe('after marshalling Deepwood Steward', function () {
            beforeEach(function () {
                // Move Kingsroad to deck now (after draw phase) so it's available for the search
                this.player1.dragCard(this.kingsroad, 'draw deck');
                this.player1.clickCard(this.steward);
            });

            it('should trigger the search reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Deepwood Steward');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.steward);
                });

                it('should show a search prompt', function () {
                    expect(this.player1).toHavePrompt('Select a location');
                });
            });
        });
    });
});
