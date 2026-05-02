// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for Wooden Sword
// - 2026-02-05: Fixed to use idiomatic helpers (setupCards, attachCard, initiateChallenge)

describe('Wooden Sword', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Wooden Sword',
                'Bran Stark (Core)'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Hedge Knight',
                'Burned Men'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.woodenSword = this.player1.findCardByName('Wooden Sword', 'hand');
            // Bran has printed power icon
            this.bran = this.player1.findCardByName('Bran Stark', 'hand');
            // Hedge Knight has printed military icon
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');
            // Burned Men has printed military icon
            this.burnedMen = this.player2.findCardByName('Burned Men', 'hand');

            this.player1.setupCards([this.bran, this.woodenSword]);
            this.player2.setupCards([this.knight, this.burnedMen]);

            this.completeSetup();

            // Attach Wooden Sword to Bran
            this.player1.attachCard(this.woodenSword, this.bran);

            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('STR bonus', function () {
            it('should give attached character +1 STR', function () {
                // Bran has 1 base STR + 1 from Wooden Sword
                expect(this.bran.getStrength()).toBe(2);
            });
        });

        describe('during a challenge', function () {
            describe('when attacking in a power challenge', function () {
                beforeEach(function () {
                    this.player1.initiateChallenge({ type: 'power', attackers: this.bran });

                    this.skipActionWindow();
                });

                describe('when a character without printed power icon defends', function () {
                    beforeEach(function () {
                        this.player2.declareDefenders(this.knight);
                    });

                    it('should not allow the defender to contribute STR', function () {
                        // Bran: 2 STR, Knight: 0 STR (cannot contribute)
                        expect(this.game.currentChallenge.attackerStrength).toBe(2);
                        expect(this.game.currentChallenge.defenderStrength).toBe(0);
                    });
                });
            });
        });
    });
});
