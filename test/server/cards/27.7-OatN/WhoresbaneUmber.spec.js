describe('Whoresbane Umber', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Whoresbane Umber (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('stark', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.whoresbane = this.player1.findCardByName('Whoresbane Umber', 'hand');

            this.player1.clickCard(this.whoresbane);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when controller has fewer than 3 used plots (round 1)', function () {
            it('should gain the Intrigue icon', function () {
                expect(this.whoresbane.hasIcon('intrigue')).toBe(true);
            });

            it('should gain Stealth keyword', function () {
                expect(this.whoresbane.hasKeyword('stealth')).toBe(true);
            });
        });
    });
});
