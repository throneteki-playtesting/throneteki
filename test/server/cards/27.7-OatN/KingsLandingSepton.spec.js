describe("King's Landing Septon", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('lannister', [
                'A Noble Cause',
                "King's Landing Septon (OatN)",
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'The Hound (TtB)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.septon = this.player1.findCardByName("King's Landing Septon", 'hand');
            this.hound = this.player2.findCardByName('The Hound', 'hand');

            this.player1.clickCard(this.septon);
            this.player2.clickCard(this.hound);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe("when an opponent's character triggers a reaction", function () {
            beforeEach(function () {
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.hound);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
            });

            it('should allow the Septon to cancel the ability by returning itself to hand', function () {
                expect(this.player1).toAllowAbilityTrigger("King's Landing Septon");
            });

            describe('when the interrupt triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.septon);
                });

                it('should return the Septon to hand', function () {
                    expect(this.septon.location).toBe('hand');
                });
            });
        });
    });
});
