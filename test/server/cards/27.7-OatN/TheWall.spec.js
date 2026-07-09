describe('The Wall', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'The Winds of Winter (Core)',
                'The Wall (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'The Tickler (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.theWall = this.player1.findCardByName('The Wall', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.tickler = this.player2.findCardByName('The Tickler', 'hand');

            this.player1.clickCard(this.knight);
            this.player2.clickCard(this.tickler);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player1.clickCard(this.theWall);
            this.completeMarshalPhase();
        });

        it('should lose all factions', function () {
            expect(this.theWall.isFaction('baratheon')).toBe(false);
            expect(this.theWall.isFaction('neutral')).toBe(false);
        });

        describe('during a challenge with a Winter plot revealed', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickCard(this.tickler);
                this.player2.clickPrompt('Done');
            });

            it('should give -1 STR to the defender (no Winter plot)', function () {
                expect(this.tickler.getStrength()).toBe(this.tickler.cardData.strength - 1);
            });

            it('should not give -1 STR to player1 Hedge Knight (controller has Winter plot)', function () {
                expect(this.knight.getStrength()).toBe(this.knight.cardData.strength);
            });
        });
    });
});
