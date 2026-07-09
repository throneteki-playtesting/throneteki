describe("Euron Crow's Eye", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                "Euron Crow's Eye (OatN)",
                "Hagen's Daughter"
            ]);
            const deck2 = this.buildDeck('greyjoy', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.euron = this.player1.findCardByName("Euron Crow's Eye", 'hand');
            this.hagensdaughter = this.player1.findCardByName("Hagen's Daughter", 'hand');

            this.completeSetup();
            this.player1.dragCard(this.euron, 'play area');
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.hagensdaughter, 'shadows');
        });

        describe('when a friendly card comes out of shadows', function () {
            beforeEach(function () {
                this.player1Object.gold = 5;
                this.player1.clickCard(this.hagensdaughter);
            });

            it('should allow triggering the reaction with keyword choice', function () {
                expect(this.player1).toAllowAbilityTrigger("Euron Crow's Eye");
            });

            describe('when Gain Renown is chosen', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.euron);
                    this.player1.clickPrompt('Gain Renown');
                });

                it('should give Euron Renown until end of phase', function () {
                    expect(this.euron.hasKeyword('renown')).toBe(true);
                });

                it('should lose Renown at end of phase', function () {
                    this.completeChallengesPhase();
                    expect(this.euron.hasKeyword('renown')).toBe(false);
                });
            });

            describe('when Gain Stealth is chosen', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.euron);
                    this.player1.clickPrompt('Gain Stealth');
                });

                it('should give Euron Stealth until end of phase', function () {
                    expect(this.euron.hasKeyword('stealth')).toBe(true);
                });
            });
        });
    });
});
