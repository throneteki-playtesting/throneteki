// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for The God's Eye
// - 2026-02-05: Fixed to use clickMenu for card actions

describe("The God's Eye", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                "The God's Eye (OatN)",
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.godsEye = this.player1.findCardByName("The God's Eye", 'hand');
            this.opponentKnight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards(this.godsEye);
            this.player2.setupCards(this.opponentKnight);

            this.completeSetup();
            this.selectFirstPlayer(this.player1);
        });

        describe('when using the action', function () {
            beforeEach(function () {
                this.player1.clickMenu(
                    this.godsEye,
                    'Reduce ambush/shadow cost for out-of-faction card'
                );
            });

            it("should kneel The God's Eye", function () {
                expect(this.godsEye.kneeled).toBe(true);
            });
        });
    });
});
