describe('Ser Axell Florent', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Ser Axell Florent (OatN)',
                'Robert Baratheon (Core)'
            ]);
            const deck2 = this.buildDeck('baratheon', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.axell = this.player1.findCardByName('Ser Axell Florent', 'hand');
            this.robert = this.player1.findCardByName('Robert Baratheon', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.axell);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player1.clickCard(this.robert);
            this.completeMarshalPhase();
            // Player1 must have more gold to win dominance
            this.player1Object.gold = 5;
            this.player2Object.gold = 0;
            this.completeChallengesPhase();
        });

        describe('when player1 wins dominance with only one King in play', function () {
            it('should allow the dominance reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Ser Axell Florent');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.axell);
                });

                it('should give Robert Baratheon 1 power', function () {
                    expect(this.robert.getPower()).toBe(1);
                });
            });
        });
    });
});
