describe('Ser Alliser Thorne', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Ser Alliser Thorne (OatN)',
                'Alan of Rosby (OatN)'
            ]);
            const deck2 = this.buildDeck('thenightswatch', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.alliser = this.player1.findCardByName('Ser Alliser Thorne', 'hand');
            this.alan = this.player1.findCardByName('Alan of Rosby', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.player1.dragCard(this.alliser, 'play area');
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.alan, 'shadows');
        });

        describe('when a card comes out of shadows during a military challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.alliser);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.player1Object.gold = 1;
                this.player1.clickCard(this.alan);
            });

            it('should allow adding a non-participating NW character to the challenge', function () {
                expect(this.player1).toAllowAbilityTrigger('Ser Alliser Thorne');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.alliser);
                    this.player1.clickCard(this.alan);
                });

                it('should add Yoren to the challenge', function () {
                    expect(this.alan.isParticipating()).toBe(true);
                });
            });
        });

        describe('outside of a military challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Power');
                this.player1.clickCard(this.alliser);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.player1Object.gold = 1;
                this.player1.clickCard(this.alan);
            });

            it('should not trigger outside a military challenge', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Ser Alliser Thorne');
            });
        });
    });
});
