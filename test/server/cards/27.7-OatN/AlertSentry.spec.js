describe('Alert Sentry', function () {
    describe('when a character is bypassed by stealth', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    hand: ['Alert Sentry', 'Alert Sentry'],
                    inPlay: ['House Maester', 'Tumblestone Knight']
                },
                player2: { inPlay: ['Maester Wendamyr (Core)', 'Maester Pylos (CtA)'] }
            });
            [this.sentry, this.secondSentry] = this.player1.filterCardsByName(
                'Alert Sentry',
                'hand'
            );
            this.maester = this.player1.findCardByName('House Maester', 'play area');
            this.knight = this.player1.findCardByName('Tumblestone Knight', 'play area');
            this.wendamyr = this.player2.findCardByName('Maester Wendamyr', 'play area');

            this.player2.clickPrompt('Power');
            this.player2.clickCard(this.wendamyr);
            this.player2.clickPrompt('Done');
            this.player2.clickCard(this.maester);
        });

        it('is offered to the controller of the bypassed character', function () {
            expect(this.player1).toAllowAbilityTrigger(this.sentry);
            expect(this.player2).not.toAllowAbilityTrigger(this.sentry);
        });

        it('puts it into play standing as a defender', function () {
            this.player1.triggerAbility(this.sentry);

            expect(this.sentry.location).toBe('play area');
            expect(this.sentry.kneeled).toBe(false);
            expect(this.game.currentChallenge.isDefending(this.sentry)).toBe(true);
            expect(this.game.currentChallenge.isDefending(this.maester)).toBe(false);
            expect(this.game.currentChallenge.isDefending(this.knight)).toBe(false);
            expect(this.secondSentry.location).toBe('hand');
        });
    });

    describe('when no character you control is bypassed', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: { hand: ['Alert Sentry'], inPlay: ['House Maester'] },
                player2: { inPlay: ['Maester Wendamyr (Core)'], hand: ['Alert Sentry'] }
            });
            this.sentry = this.player1.findCardByName('Alert Sentry', 'hand');
            this.opponentSentry = this.player2.findCardByName('Alert Sentry', 'hand');
        });

        it('is not offered when the opponent bypasses nothing of yours', function () {
            this.player2.clickPrompt('Power');
            this.player2.clickCard('Maester Wendamyr', 'play area');
            this.player2.clickPrompt('Done');

            expect(this.player1).not.toAllowAbilityTrigger(this.sentry);
            expect(this.player2).not.toAllowAbilityTrigger(this.opponentSentry);
        });
    });
});
