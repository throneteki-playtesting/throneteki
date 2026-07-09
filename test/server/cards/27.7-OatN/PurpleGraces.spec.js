describe('Purple Graces', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Purple Graces (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.graces = this.player1.findCardByName('Purple Graces', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.graces);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when a military challenge is initiated against player1', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.p2knight);
                this.player2.clickPrompt('Done');
            });

            it('should allow Purple Graces to kneel and give the attacker -2 STR', function () {
                expect(this.player1).toAllowAbilityTrigger('Purple Graces');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.graces);
                    this.player1.clickCard(this.p2knight);
                });

                it('should give attacker -2 STR until end of phase', function () {
                    expect(this.p2knight.getStrength()).toBe(this.p2knight.cardData.strength - 2);
                });

                it('should kneel Purple Graces', function () {
                    expect(this.graces.kneeled).toBe(true);
                });

                it('should restore STR at end of phase', function () {
                    this.skipActionWindow();
                    this.player1.clickPrompt('Done');
                    this.skipActionWindow();
                    this.completeChallengesPhase();
                    expect(this.p2knight.getStrength()).toBe(this.p2knight.cardData.strength);
                });
            });
        });
    });
});
