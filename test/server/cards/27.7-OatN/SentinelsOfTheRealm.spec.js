// Generated with Claude Code - claude-opus-4-5-20251101
// - 2026-01-25: Implement spec for Sentinels of the Realm
// - 2026-02-28: Refactored to use semantic helpers (setupCards, initiateChallenge, handSize, skipClaim)

describe('Sentinels of the Realm', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'Sentinels of the Realm',
                'A Noble Cause',
                'Hedge Knight',
                'Left'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Hedge Knight',
                'Steward at the Wall',
                'Dragonstone Faithful'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.nonGuardDefender = this.player1.findCardByName('Hedge Knight', 'hand');
            this.guardDefender = this.player1.findCardByName('Left', 'hand');

            this.attacker = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.nonGuardDefender, this.guardDefender]);
            this.player2.setupCards([this.attacker, 'Steward at the Wall', 'Dragonstone Faithful']);

            this.completeSetup();

            this.selectFirstPlayer(this.player2);

            // Add cards to be drawn
            this.player1.addCards([{ name: 'Hedge Knight', count: 10 }]);

            this.completeMarshalPhase();
        });

        describe('non-Guard character defending alone', function () {
            beforeEach(function () {
                this.player2.initiateChallenge({ type: 'military', attackers: this.attacker });

                this.skipActionWindow();

                // Player 1 defends with non-Guard Hedge Knight alone
                this.player1.declareDefenders(this.nonGuardDefender);
            });

            it('should not contribute strength when defending alone', function () {
                expect(this.nonGuardDefender.getStrength()).toBe(2);
                expect(this.game.currentChallenge.defenderStrength).toBe(0);
            });
        });

        describe('Guard character defending alone', function () {
            beforeEach(function () {
                this.player2.initiateChallenge({ type: 'military', attackers: this.attacker });

                this.skipActionWindow();

                // Player 1 defends with Guard alone
                this.player1.declareDefenders(this.guardDefender);
            });

            it('should contribute strength normally', function () {
                expect(this.guardDefender.getStrength()).toBe(2);
                expect(this.game.currentChallenge.defenderStrength).toBe(2);
            });
        });

        describe('end of challenge phase draw', function () {
            describe('when no challenges were initiated against the player', function () {
                beforeEach(function () {
                    // Skip all challenges
                    this.player2.passChallenge();
                    this.player1.passChallenge();

                    this.initialHandSize = this.player1.handSize;
                });

                it('should draw 3 cards', function () {
                    this.player1.triggerAbility('Sentinels of the Realm');
                    expect(this.player1.handSize).toBe(this.initialHandSize + 3);
                });
            });

            describe('when one type of challenge was initiated', function () {
                beforeEach(function () {
                    this.player2.initiateChallenge({ type: 'military', attackers: this.attacker });

                    this.skipActionWindow();

                    this.player1.declareDefenders([]);

                    this.skipActionWindow();

                    this.player2.skipClaim();

                    // End challenges
                    this.player2.passChallenge();
                    this.player1.passChallenge();

                    this.initialHandSize = this.player1.handSize;
                });

                it('should draw 2 cards', function () {
                    this.player1.triggerAbility('Sentinels of the Realm');
                    expect(this.player1.handSize).toBe(this.initialHandSize + 2);
                });
            });

            describe('when two types of challenges were initiated', function () {
                beforeEach(function () {
                    this.player2.initiateChallenge({ type: 'military', attackers: this.attacker });

                    this.skipActionWindow();
                    this.player1.declareDefenders([]);
                    this.skipActionWindow();

                    this.player2.skipClaim();

                    this.player2.initiateChallenge({
                        type: 'intrigue',
                        attackers: 'Steward at the Wall'
                    });

                    this.skipActionWindow();
                    this.player1.declareDefenders([]);
                    this.skipActionWindow();

                    this.player2.skipClaim();

                    // End challenges
                    this.player2.passChallenge();
                    this.player1.passChallenge();

                    this.initialHandSize = this.player1.handSize;
                });

                it('should draw 1 card', function () {
                    this.player1.triggerAbility('Sentinels of the Realm');
                    expect(this.player1.handSize).toBe(this.initialHandSize + 1);
                });
            });

            describe('when all three types of challenges were initiated', function () {
                beforeEach(function () {
                    this.player2.initiateChallenge({ type: 'military', attackers: this.attacker });

                    this.skipActionWindow();
                    this.player1.declareDefenders([]);
                    this.skipActionWindow();

                    this.player2.skipClaim();

                    this.player2.initiateChallenge({
                        type: 'intrigue',
                        attackers: 'Steward at the Wall'
                    });

                    this.skipActionWindow();
                    this.player1.declareDefenders([]);
                    this.skipActionWindow();

                    this.player2.skipClaim();

                    this.player2.initiateChallenge({
                        type: 'power',
                        attackers: 'Dragonstone Faithful'
                    });

                    this.skipActionWindow();
                    this.player1.declareDefenders([]);
                    this.skipActionWindow();

                    this.player2.skipClaim();

                    // End challenges
                    this.player2.passChallenge();
                    this.player1.passChallenge();
                });

                it('should not allow triggering the ability', function () {
                    expect(this.player1).not.toAllowAbilityTrigger('Sentinels of the Realm');
                });
            });
        });
    });
});
