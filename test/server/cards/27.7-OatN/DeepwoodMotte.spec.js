describe('Deepwood Motte', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Song of Summer',
                'Deepwood Motte (OatN)',
                'Asha Greyjoy (Core)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Song of Summer',
                'Cersei Lannister (Core)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.motte = this.player1.findCardByName('Deepwood Motte', 'hand');
            this.asha = this.player1.findCardByName('Asha Greyjoy', 'hand');

            this.player1.clickCard(this.asha);
            this.player1.clickCard(this.motte);
            this.player2.clickCard(this.player2.findCardByName('Cersei Lannister', 'hand'));
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        it('should apply -2 to initiative via plot modifiers', function () {
            const base = this.player1Object.activePlot.cardData.plotStats?.initiative ?? 0;
            expect(this.player1Object.activePlot.getInitiative()).toBe(Math.max(base - 2, 0));
        });

        it('should enter play as a location', function () {
            expect(this.motte.location).toBe('play area');
            expect(this.motte.getType()).toBe('location');
        });
    });
});
