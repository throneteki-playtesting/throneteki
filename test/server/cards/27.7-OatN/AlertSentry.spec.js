// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created spec for Alert Sentry
// - 2026-02-01: Fixed challenge initiation order (type first, then attackers)
// - 2026-02-28: Refactored to use stealthTargets in initiateChallenge

describe('Alert Sentry', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Alert Sentry',
                'Steward at the Wall'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Varys (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.alertSentry = this.player1.findCardByName('Alert Sentry', 'hand');
            this.steward = this.player1.findCardByName('Steward at the Wall', 'hand');

            this.varys = this.player2.findCardByName('Varys', 'hand');

            this.player1.setupCards(this.steward);
            this.player2.setupCards(this.varys);
            this.completeSetup();

            this.selectFirstPlayer(this.player2);
            this.completeMarshalPhase();
        });

        describe('when a character is bypassed by stealth', function () {
            beforeEach(function () {
                this.player2.initiateChallenge({
                    type: 'intrigue',
                    attackers: this.varys,
                    stealthTargets: this.steward
                });
            });

            it('should allow Alert Sentry to enter play from hand', function () {
                expect(this.player1).toAllowAbilityTrigger(this.alertSentry);
            });

            describe('when the ability is triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.alertSentry);
                });

                it('should put Alert Sentry into play', function () {
                    expect(this.alertSentry.location).toBe('play area');
                });

                it('should have Alert Sentry standing', function () {
                    expect(this.alertSentry.kneeled).toBe(false);
                });

                it('should have Alert Sentry participating as a defender', function () {
                    expect(this.alertSentry.isDefending()).toBe(true);
                });
            });
        });
    });
});
