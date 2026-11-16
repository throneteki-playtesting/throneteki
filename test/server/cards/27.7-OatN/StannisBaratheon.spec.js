describe('Stannis Baratheon (OatN)', function () {
    function setup(context, { plot = 'The Winds of Winter', firstPlayer = 'player1' } = {}) {
        context.setupTest({
            phase: 'challenge',
            firstPlayer,
            player1: {
                plot,
                inPlay: [
                    'Stannis Baratheon (OatN)',
                    'Bastard in Hiding',
                    'Tumblestone Knight',
                    'House Maester'
                ]
            },
            player2: { inPlay: ['Bastard in Hiding', 'Tumblestone Knight'] }
        });
        context.stannis = context.player1.findCardByName('Stannis Baratheon', 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.opponentBastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
        context.opponentKnight = context.player2.findCardByName('Tumblestone Knight', 'play area');
    }

    describe('during a military challenge you initiated with a Winter plot revealed', function () {
        beforeEach(function () {
            setup(this);
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');
            this.player1.clickMenu(this.stannis, 'End challenge with no winner or loser');
        });

        it('ends the challenge and lets you initiate an additional challenge of that type', function () {
            expect(this.game.currentChallenge.cancelled).toBe(true);
            expect(this.player1Object.faction.kneeled).toBe(true);
            expect(this.player1Object.faction.power).toBe(0);
            expect(this.player2Object.faction.power).toBe(0);

            this.player2.clickPrompt('Pass');
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.knight);
            this.player1.clickPrompt('Done');

            expect(this.game.currentChallenge.attackingPlayer).toBe(this.player1Object);
            expect(this.game.currentChallenge.challengeType).toBe('military');
        });
    });

    describe('during a challenge initiated against you', function () {
        beforeEach(function () {
            setup(this, { firstPlayer: 'player2' });
            this.player2.clickPrompt('Power');
            this.player2.clickCard(this.opponentBastard);
            this.player2.clickPrompt('Done');
            this.player2.clickPrompt('Pass');
            this.player1.clickMenu(this.stannis, 'End challenge with no winner or loser');
        });

        it('lets the attacking player initiate the additional challenge', function () {
            expect(this.game.currentChallenge.cancelled).toBe(true);

            this.player2.clickPrompt('Pass');
            this.player2.clickPrompt('Power');
            this.player2.clickCard(this.opponentKnight);
            this.player2.clickPrompt('Done');

            expect(this.game.currentChallenge.attackingPlayer).toBe(this.player2Object);
            expect(this.game.currentChallenge.challengeType).toBe('power');
        });
    });

    describe('without a Winter plot revealed', function () {
        beforeEach(function () {
            setup(this, { plot: 'A Noble Cause' });
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.stannis)).toBe('condition');
        });
    });

    describe('during an intrigue challenge', function () {
        beforeEach(function () {
            setup(this);
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.maester);
            this.player1.clickPrompt('Done');
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.stannis)).toBe('condition');
        });
    });
});
