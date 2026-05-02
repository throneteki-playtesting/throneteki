// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for Brotherhood's Bounty
// - 2026-02-28: Fixed deck size for draw, use loyal Catelyn Stark

describe("Brotherhood's Bounty", function () {
    integration(function () {
        describe('when controlling no loyal characters', function () {
            beforeEach(function () {
                // Sneak Attack: income 5, claim 2
                const deck1 = this.buildDeck('stark', [
                    'Sneak Attack',
                    "Brotherhood's Bounty",
                    'Hedge Knight'
                ]);
                const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
                this.player1.selectDeck(deck1);
                this.player2.selectDeck(deck2);
                this.startGame();
                this.keepStartingHands();

                this.bounty = this.player1.findCardByName("Brotherhood's Bounty", 'hand');
                this.hedgeKnight = this.player1.findCardByName('Hedge Knight', 'hand');
                this.opponentKnight = this.player2.findCardByName('Hedge Knight', 'hand');

                this.player1.setupCards(this.hedgeKnight);
                this.player2.setupCards(this.opponentKnight);
                this.completeSetup();

                this.selectFirstPlayer(this.player1);
            });

            it('should allow playing the event', function () {
                let initialGold = this.player1Object.gold;

                this.player1.playEvent(this.bounty);

                // Event should be played (moved to discard pile)
                expect(this.bounty.location).toBe('discard pile');
                // Should gain gold equal to claim (Sneak Attack claim = 2)
                expect(this.player1Object.gold).toBe(initialGold + 2);
            });
        });

        describe('when controlling a loyal character', function () {
            beforeEach(function () {
                // Catelyn Stark (Core) IS loyal (unlike Eddard)
                const deck1 = this.buildDeck('stark', [
                    'A Noble Cause',
                    "Brotherhood's Bounty",
                    'Catelyn Stark (Core)'
                ]);
                const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
                this.player1.selectDeck(deck1);
                this.player2.selectDeck(deck2);
                this.startGame();
                this.keepStartingHands();

                this.bounty = this.player1.findCardByName("Brotherhood's Bounty", 'hand');
                this.catelyn = this.player1.findCardByName('Catelyn Stark', 'hand');
                this.opponentKnight = this.player2.findCardByName('Hedge Knight', 'hand');

                this.player1.setupCards(this.catelyn);
                this.player2.setupCards(this.opponentKnight);
                this.completeSetup();

                this.selectFirstPlayer(this.player1);
            });

            it('should not allow playing the event', function () {
                this.player1.clickCard(this.bounty);
                expect(this.bounty.location).toBe('hand');
            });
        });
    });
});
