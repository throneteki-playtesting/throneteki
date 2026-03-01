// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for Children of the Forest
// - 2026-02-05: Fixed to use setupCards and test action in marshal phase
// - 2026-02-05: Fixed to use clickMenu for card actions

describe('Children of the Forest', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Children of the Forest',
                'Hedge Knight',
                'Winterfell Steward'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.children = this.player1.findCardByName('Children of the Forest', 'hand');
            this.hedgeKnight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.steward = this.player1.findCardByName('Winterfell Steward', 'hand');
            this.opponentKnight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards(this.children);
            this.player2.setupCards(this.opponentKnight);
            this.completeSetup();

            this.selectFirstPlayer(this.player1);
        });

        describe('when there is a matching card type in discard pile', function () {
            beforeEach(function () {
                // Move the Winterfell Steward to discard pile
                this.player1Object.moveCard(this.steward, 'discard pile');
            });

            it('should allow using the action', function () {
                this.player1.clickMenu(this.children, 'Return card from discard pile');
                expect(this.player1).toHavePrompt('Select card to discard from hand');
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.children, 'Return card from discard pile');
                });

                it('should prompt to discard a card from hand', function () {
                    expect(this.player1).toHavePrompt('Select card to discard from hand');
                });

                describe('when a card is discarded', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.hedgeKnight);
                    });

                    it('should prompt to select a card from discard pile', function () {
                        expect(this.player1).toHavePrompt('Select a card to return to hand');
                    });

                    describe('when a card is selected from discard pile', function () {
                        beforeEach(function () {
                            this.player1.clickCard(this.steward);
                        });

                        it('should return the card to hand', function () {
                            expect(this.steward.location).toBe('hand');
                        });

                        it('should have discarded the cost card', function () {
                            expect(this.hedgeKnight.location).toBe('discard pile');
                        });
                    });
                });
            });
        });
    });
});
