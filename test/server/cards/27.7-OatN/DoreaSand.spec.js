describe('Dorea Sand', function () {
    function setup(context, { opponent }) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    'Dorea Sand (OatN)',
                    { card: 'Obara Sand (Core)', kneeling: true },
                    { card: 'The Red Viper (Core)', kneeling: true },
                    { card: 'House Dayne Knight', kneeling: true }
                ]
            },
            player2: { inPlay: opponent }
        });
        context.obara = context.player1.findCardByName('Obara Sand', 'play area');
        context.viper = context.player1.findCardByName('The Red Viper', 'play area');
        context.dayne = context.player1.findCardByName('House Dayne Knight', 'play area');
    }

    describe('when you control fewer characters than each opponent after returning', function () {
        beforeEach(function () {
            setup(this, {
                opponent: [
                    'Bastard in Hiding',
                    'Bastard in Hiding',
                    'Bastard in Hiding',
                    'House Maester'
                ]
            });
            this.opponentSnake = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player1.clickMenu(this.doreaSand, 'Return to hand');
        });

        it('returns to hand, then stands The Red Viper or a Sand Snake you control', function () {
            expect(this.doreaSand.location).toBe('hand');
            expect(this.player1).toBeAbleToSelect(this.obara);
            expect(this.player1).toBeAbleToSelect(this.viper);
            expect(this.player1).not.toBeAbleToSelect(this.dayne);
            expect(this.player1).not.toBeAbleToSelect(this.opponentSnake);

            this.player1.clickCard(this.obara);

            expect(this.obara.kneeled).toBe(false);
            expect(this.viper.kneeled).toBe(true);
            expect(this.dayne.kneeled).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when you control as many characters as an opponent after returning', function () {
        beforeEach(function () {
            setup(this, { opponent: ['Bastard in Hiding', 'House Maester', 'Tumblestone Knight'] });
            this.player1.clickMenu(this.doreaSand, 'Return to hand');
        });

        it('only returns to hand', function () {
            expect(this.doreaSand.location).toBe('hand');
            expect(this.obara.kneeled).toBe(true);
            expect(this.viper.kneeled).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Dorea Sand (OatN)'] },
                player2: {}
            });
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.doreaSand)).toBe('phase');
        });
    });
});
