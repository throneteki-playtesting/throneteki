describe('Riverrun Besiegers', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('lannister', [
                'A Noble Cause',
                { name: 'Riverrun Besiegers (OatN)', count: 2 },
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('stark', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            [this.besiegers1, this.besiegers2] = this.player1.filterCardsByName(
                'Riverrun Besiegers',
                'hand'
            );
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.besiegers1);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.completeMarshalPhase();
        });

        it('should enter play as a character', function () {
            expect(this.besiegers1.location).toBe('play area');
        });

        it('should have the Army and House Frey traits', function () {
            expect(this.besiegers1.hasTrait('Army')).toBe(true);
            expect(this.besiegers1.hasTrait('House Frey')).toBe(true);
        });
    });
});
