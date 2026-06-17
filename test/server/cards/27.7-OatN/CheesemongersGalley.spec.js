// Claude: Cheesemonger's Galley (code 27582) - interrupt to return to shadows and gain gold at income
describe("Cheesemonger's Galley", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                "Cheesemonger's Galley (OatN)",
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.galley = this.player1.findCardByName("Cheesemonger's Galley", 'hand');

            this.player1.clickCard(this.galley);
            this.player1.clickPrompt('Setup');
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
        });

        it('should allow the interrupt to return to shadows and gain gold', function () {
            expect(this.player1).toAllowAbilityTrigger("Cheesemonger's Galley");
        });

        describe('when the interrupt triggers', function () {
            beforeEach(function () {
                this.player1Object.gold = 0;
                this.player1.triggerAbility(this.galley);
            });

            it('should return the galley to shadows', function () {
                expect(this.galley.location).toBe('shadows');
            });

            it('should gain 1 gold', function () {
                expect(this.player1Object.gold).toBeGreaterThan(0);
            });
        });
    });
});
