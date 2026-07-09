describe('Liddle Scout', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', ['A Noble Cause', 'Liddle Scout (OatN)']);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Ser Mandon Moore (AtG)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.scout = this.player1.findCardByName('Liddle Scout', 'hand');
            this.mandon = this.player2.findCardByName('Ser Mandon Moore', 'hand');
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.scout);
            this.player2.clickCard(this.knight);
            this.completeSetup();
            this.player2.dragCard(this.mandon, 'play area');
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        it('should enter play as a character', function () {
            expect(this.scout.location).toBe('play area');
            expect(this.scout.getType()).toBe('character');
        });

        describe('when attacking', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.scout);
                this.player1.clickPrompt('Done');
                // Dismiss the stealth target prompt
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
            });

            it('should prevent characters with shadow from being declared as defenders', function () {
                expect(this.player2).not.toAllowSelect(this.mandon);
            });

            it('should allow characters without shadow to defend', function () {
                expect(this.player2).toAllowSelect(this.knight);
            });
        });
    });
});
