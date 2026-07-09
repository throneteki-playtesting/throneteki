describe('Stannis Baratheon', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'The Winds of Winter (Core)',
                'Stannis Baratheon (OatN)',
                'Hedge Knight',
                'Melisandre (Core)'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.stannis = this.player1.findCardByName('Stannis Baratheon', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.stannis);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when a military challenge is in progress and a Winter plot is revealed', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.p2knight);
                this.player2.clickPrompt('Done');
            });

            it('should allow Stannis to cancel the challenge', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.stannis,
                    'End challenge with no winner or loser'
                );
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.stannis, 'End challenge with no winner or loser');
                });

                it('should cancel the challenge', function () {
                    expect(this.game.currentChallenge.cancelled).toBe(true);
                });

                it('should allow the attacking player to initiate an additional military challenge', function () {
                    expect(this.player2Object.challenges.allowedChallenges.length).toBeGreaterThan(
                        0
                    );
                });
            });
        });

        describe('when there is no Winter plot revealed', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.p2knight);
                this.player2.clickPrompt('Done');
            });

            it('should not be activatable without a Winter plot', function () {
                const winterPlot = this.player1Object.activePlot;
                if (!winterPlot || !winterPlot.hasTrait('Winter')) {
                    expect(this.player1).not.toAllowTriggerAction(
                        this.stannis,
                        'End challenge with no winner or loser'
                    );
                }
            });
        });
    });
});
