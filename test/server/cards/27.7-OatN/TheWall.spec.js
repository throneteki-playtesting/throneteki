describe('The Wall', function () {
    function setup(context, plots) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                plot: plots.player1,
                inPlay: ['The Wall (OatN)', 'Bastard in Hiding', 'House Maester']
            },
            player2: {
                plot: plots.player2,
                inPlay: ['Tumblestone Knight', 'Bastard in Hiding']
            }
        });
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.knight = context.player2.findCardByName('Tumblestone Knight', 'play area');
        context.opponentBastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
        context.player1.clickPrompt('Power');
        context.player1.clickCard(context.bastard);
        context.player1.clickCard(context.maester);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickCard(context.knight);
        context.player2.clickPrompt('Done');
    }

    describe('while a Winter plot is revealed by one player', function () {
        beforeEach(function () {
            setup(this, { player1: 'A Noble Cause', player2: 'The Winds of Winter' });
        });

        it('gives -1 STR to participating characters of players without a Winter plot', function () {
            expect(this.bastard.getStrength()).toBe(1);
            expect(this.maester.getStrength()).toBe(1);
            expect(this.knight.getStrength()).toBe(2);
            expect(this.opponentBastard.getStrength()).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('while no Winter plot is revealed', function () {
        beforeEach(function () {
            setup(this, { player1: 'A Noble Cause', player2: 'A Noble Cause' });
        });

        it('gives no penalty', function () {
            expect(this.bastard.getStrength()).toBe(2);
            expect(this.knight.getStrength()).toBe(2);
        });
    });

    describe('being out-of-faction', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['The Wall (OatN)'] },
                player2: {}
            });
        });

        it('is not considered Baratheon for card effects', function () {
            expect(this.theWall.isFaction('baratheon')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
