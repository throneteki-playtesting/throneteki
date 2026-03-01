// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for The Riverroad
// - 2026-02-05: Fixed to use clickMenu for card actions
// - 2026-02-28: Refactored to use selectIcon helper

describe('The Riverroad', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'The Riverroad',
                'Bran Stark (Core)'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.riverroad = this.player1.findCardByName('The Riverroad', 'hand');
            this.bran = this.player1.findCardByName('Bran Stark', 'hand');
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.riverroad, this.bran]);
            this.player2.setupCards(this.knight);

            this.completeSetup();
            this.selectFirstPlayer(this.player1);
        });

        describe('when using the action', function () {
            beforeEach(function () {
                this.player1.clickMenu(this.riverroad, 'Give a character a challenge icon');
            });

            it('should prompt to select a character', function () {
                expect(this.player1).toHavePrompt('Select a character');
            });

            describe('when a character is selected', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.bran);
                });

                it('should prompt to select a challenge icon', function () {
                    expect(this.player1).toHavePrompt('Select an icon');
                });

                describe('when an icon is selected', function () {
                    beforeEach(function () {
                        this.player1.selectIcon('military');
                    });

                    it('should sacrifice The Riverroad', function () {
                        expect(this.riverroad.location).toBe('discard pile');
                    });

                    it('should grant the character the chosen icon', function () {
                        expect(this.bran.hasIcon('military')).toBe(true);
                    });
                });
            });
        });
    });
});
