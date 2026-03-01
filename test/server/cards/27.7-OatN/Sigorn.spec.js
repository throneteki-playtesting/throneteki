// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for Sigorn
// - 2026-02-05: Fixed to use Sansa Stark (Lady trait) instead of Ygritte
// - 2026-02-28: Disambiguated Thenns (FtR)

describe('Sigorn', function () {
    integration(function () {
        describe('when controlling a Lady character', function () {
            beforeEach(function () {
                const deck1 = this.buildDeck('stark', [
                    'A Noble Cause',
                    'Sigorn',
                    'Sansa Stark (Core)'
                ]);
                const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
                this.player1.selectDeck(deck1);
                this.player2.selectDeck(deck2);
                this.startGame();
                this.keepStartingHands();

                this.sigorn = this.player1.findCardByName('Sigorn', 'hand');
                this.sansa = this.player1.findCardByName('Sansa Stark', 'hand');
                this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

                // Setup Sigorn (5) + Sansa (3) = 8 gold
                this.player1.setupCards([this.sigorn, this.sansa]);
                this.player2.setupCards(this.knight);
                this.completeSetup();

                this.selectFirstPlayer(this.player1);
            });

            it("should have the R'hllor trait", function () {
                expect(this.sigorn.hasTrait("R'hllor")).toBe(true);
            });

            it('should have renown', function () {
                expect(this.sigorn.hasKeyword('renown')).toBe(true);
            });
        });

        describe('when not controlling a Lady character', function () {
            beforeEach(function () {
                const deck1 = this.buildDeck('stark', [
                    'A Noble Cause',
                    'Sigorn',
                    'Thenns (FtR)'
                ]);
                const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
                this.player1.selectDeck(deck1);
                this.player2.selectDeck(deck2);
                this.startGame();
                this.keepStartingHands();

                this.sigorn = this.player1.findCardByName('Sigorn', 'hand');
                this.thenns = this.player1.findCardByName('Thenns (FtR)', 'hand');
                this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

                // Sigorn (5) + Thenns (3) = 8 gold
                this.player1.setupCards([this.sigorn, this.thenns]);
                this.player2.setupCards(this.knight);
                this.completeSetup();

                this.selectFirstPlayer(this.player1);
            });

            it("should not have the R'hllor trait", function () {
                expect(this.sigorn.hasTrait("R'hllor")).toBe(false);
            });

            it('should not have renown', function () {
                expect(this.sigorn.hasKeyword('renown')).toBe(false);
            });
        });

        describe('participating while standing', function () {
            beforeEach(function () {
                const deck1 = this.buildDeck('stark', [
                    'A Noble Cause',
                    'Sigorn',
                    'Thenns (FtR)'
                ]);
                const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Hedge Knight']);
                this.player1.selectDeck(deck1);
                this.player2.selectDeck(deck2);
                this.startGame();
                this.keepStartingHands();

                this.sigorn = this.player1.findCardByName('Sigorn', 'hand');
                this.thenns = this.player1.findCardByName('Thenns (FtR)', 'hand');
                this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

                this.player1.setupCards([this.sigorn, this.thenns]);
                this.player2.setupCards(this.knight);
                this.completeSetup();

                this.selectFirstPlayer(this.player1);
                this.completeMarshalPhase();
            });

            it('should be considered attacking when another Wildling attacks', function () {
                this.player1.initiateChallenge({ type: 'military', attackers: this.thenns });
                // Skip Thenns assault target selection
                this.player1.clickPrompt('Done');

                expect(this.sigorn.isParticipating()).toBe(true);
                expect(this.sigorn.kneeled).toBe(false);
            });
        });
    });
});
