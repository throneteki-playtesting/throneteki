describe('Woods Witch', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Woods Witch (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.witch = this.player1.findCardByName('Woods Witch', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.witch);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when an opponent discards a character from hand (via intrigue claim)', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.witch);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Apply Claim');
                this.player2.clickCard(this.cersei);
            });

            it('should allow the Woods Witch to react', function () {
                expect(this.player1).toAllowAbilityTrigger('Woods Witch');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.witch);
                });

                it('should sacrifice the Woods Witch', function () {
                    expect(this.witch.location).toBe('discard pile');
                });

                it('should prompt the opponent to sacrifice a card of matching cost', function () {
                    expect(this.player2).toHavePrompt(
                        'Select a card with printed cost ' +
                            this.cersei.getPrintedCost() +
                            ' to sacrifice'
                    );
                });
            });
        });
    });
});
