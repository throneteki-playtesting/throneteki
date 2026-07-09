describe('Prince of Dorne', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'Prince of Dorne (OatN)',
                'Doran Martell (Core)'
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

            this.prince = this.player1.findCardByName('Prince of Dorne', 'hand');
            this.doran = this.player1.findCardByName('Doran Martell', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');

            this.player1.clickCard(this.doran);
            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player1.clickCard(this.prince);
            this.player1.clickCard(this.doran);
            this.completeMarshalPhase();
        });

        describe('when attached to Doran Martell', function () {
            it('should give Doran the military icon', function () {
                expect(this.doran.hasIcon('military')).toBe(true);
            });
        });

        describe('when player1 attacks militarily and wins', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.doran);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Apply Claim');
            });

            it('should allow intercepting to convert to intrigue claim', function () {
                expect(this.player1).toAllowAbilityTrigger('Prince of Dorne');
            });

            describe('when the interrupt triggers', function () {
                beforeEach(function () {
                    this.p2HandSizeBefore = this.player2.handSize;
                    this.player1.triggerAbility(this.prince);
                });

                it('should give Doran 1 power', function () {
                    expect(this.doran.getPower()).toBe(1);
                });

                it('should apply intrigue claim instead of military', function () {
                    // Intrigue claim discards a random card from hand instead of killing
                    expect(this.player2.handSize).toBe(this.p2HandSizeBefore - 1);
                    expect(this.cersei.location).toBe('play area');
                });
            });
        });
    });
});
