// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for Hot Pie
// - 2026-02-05: Fixed to use clickMenu for challenge-phase action

describe('Hot Pie', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Hot Pie (OatN)',
                'Arya Stark (Core)'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.hotPie = this.player1.findCardByName('Hot Pie', 'hand');
            this.arya = this.player1.findCardByName('Arya Stark', 'hand');
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.hotPie, this.arya]);
            this.player2.setupCards(this.knight);
            this.completeSetup();

            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when using the action', function () {
            beforeEach(function () {
                this.initialStr = this.arya.getStrength();
                this.player1.clickMenu(this.hotPie, 'Give STR bonus based on keywords');
            });

            it('should prompt to choose a character', function () {
                expect(this.player1).toHavePrompt('Select a character');
            });

            describe('when Arya is selected', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.arya);
                });

                it('should kneel Hot Pie', function () {
                    expect(this.hotPie.kneeled).toBe(true);
                });

                it('should give Arya +1 STR for her Stealth keyword', function () {
                    expect(this.arya.getStrength()).toBe(this.initialStr + 1);
                });
            });
        });
    });
});
