describe('Northern Mountain Clans', function () {
    function setup(context, plot) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                plot,
                inPlay: [
                    'Northern Mountain Clans',
                    { card: 'House Maester', kneeling: true },
                    { card: 'Bastard in Hiding', kneeling: true },
                    { card: 'Tumblestone Knight', kneeling: true }
                ]
            },
            player2: { inPlay: ['Tumblestone Knight', 'Bastard in Hiding'] }
        });
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.opponentKnight = context.player2.findCardByName('Tumblestone Knight', 'play area');
        context.player1.clickPrompt('Military');
        context.player1.clickCard(context.northernMountainClans);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('with a claim value of 1', function () {
        beforeEach(function () {
            setup(this, 'A Noble Cause');
            this.player1.triggerAbility(this.northernMountainClans);
        });

        it('chooses a character that cannot stand during the standing phase', function () {
            expect(this.player1).toBeAbleToSelect(this.maester);
            expect(this.player1).toBeAbleToSelect(this.opponentKnight);
            expect(this.player1).toBeAbleToSelect(this.northernMountainClans);

            this.player1.clickCard(this.maester);
            this.player1.clickPrompt('Done');
            this.player2.clickCard(this.opponentKnight);
            this.completeChallengesPhase();

            expect(this.game.currentPhase).toBe('plot');
            expect(this.maester.kneeled).toBe(true);
            expect(this.bastard.kneeled).toBe(false);
            expect(this.knight.kneeled).toBe(false);
        });
    });

    describe('with a claim value of 2', function () {
        beforeEach(function () {
            setup(this, 'The Winds of Winter');
            this.player1.triggerAbility(this.northernMountainClans);
        });

        it('chooses 2 characters', function () {
            this.player1.clickCard(this.maester);
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');
            this.player2.clickCard(this.opponentKnight);
            this.player2.clickCard(this.player2.findCardByName('Bastard in Hiding', 'play area'));
            this.player2.clickPrompt('Done');
            this.player2.clickPrompt('Done');
            this.completeChallengesPhase();

            expect(this.maester.kneeled).toBe(true);
            expect(this.bastard.kneeled).toBe(true);
            expect(this.knight.kneeled).toBe(false);
        });
    });
});
