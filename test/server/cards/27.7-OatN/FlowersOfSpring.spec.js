// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for "Flowers of Spring"
// - 2026-02-05: Fixed to use idiomatic helpers (setupCards, passChallenge)

describe('"Flowers of Spring"', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                '"Flowers of Spring"',
                'The Mander'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Hedge Knight',
                'Tears of Lys'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.flowers = this.player1.findCardByName('"Flowers of Spring"', 'hand');
            this.mander = this.player1.findCardByName('The Mander', 'hand');
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');
            this.tears = this.player2.findCardByName('Tears of Lys', 'hand');

            this.player1.setupCards(this.mander);
            this.player2.setupCards(this.knight);
            this.completeSetup();

            this.selectFirstPlayer(this.player1);
        });

        describe('when challenges phase begins', function () {
            beforeEach(function () {
                this.completeMarshalPhase();
            });

            it('should allow the reaction to be triggered', function () {
                expect(this.player1).toAllowAbilityTrigger(this.flowers);
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.flowers);
                });

                it('should prompt to choose a player', function () {
                    expect(this.player1).toHavePrompt('Select a player');
                });

                describe('when a player is chosen', function () {
                    beforeEach(function () {
                        this.player1.clickPrompt('player2');
                    });

                    it('should prevent that player from playing non-Song events', function () {
                        // Skip challenge initiation to get to action windows
                        this.player1.passChallenge();
                        this.player2.passChallenge();

                        // Try to play Tears of Lys (non-Song event) in action window
                        this.player2.clickCard(this.tears);

                        // Should not be able to play it
                        expect(this.tears.location).toBe('hand');
                    });
                });
            });
        });
    });
});
