describe('A Game of Cyvasse', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'A Game of Cyvasse (OatN)',
                'Doran Martell (Core)',
                'Ricasso (AMAF)'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'The Tickler (Core)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.cyvasse = this.player1.findCardByName('A Game of Cyvasse', 'hand');
            this.doran = this.player1.findCardByName('Doran Martell', 'hand');
            this.tickler = this.player2.findCardByName('The Tickler', 'hand');

            this.player1.clickCard(this.doran);
            this.player2.clickCard(this.tickler);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when played during the challenge phase', function () {
            it('should be playable when player1 has an intrigue character', function () {
                this.player1.clickCard(this.cyvasse);
                expect(this.player1).toHavePrompt('Select a character');
            });

            describe('when each player kneels their intrigue character', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.cyvasse);
                    this.player1.clickCard(this.doran);
                    this.player2.clickCard(this.tickler);
                });

                it('should kneel the higher STR character and leave it in play', function () {
                    expect(this.doran.location).toBe('play area');
                    expect(this.doran.kneeled).toBe(true);
                });

                it('should return the lowest-STR kneeled character to hand', function () {
                    expect(this.tickler.location).toBe('hand');
                });
            });
        });
    });
});
