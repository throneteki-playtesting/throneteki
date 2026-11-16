describe('Torghen Flint', function () {
    function setup(context, { plot, opponentPlot }) {
        context.setupTest({
            phase: 'plot',
            player1: {
                plotDeck: [plot],
                inPlay: ['Torghen Flint'],
                hand: ['Liddle Scout', 'House Maester']
            },
            player2: { plotDeck: [opponentPlot] }
        });
        context.scout = context.player1.findCardByName('Liddle Scout', 'hand');
        context.maester = context.player1.findCardByName('House Maester', 'hand');
        context.player1.selectPlot(plot);
        context.player2.selectPlot(opponentPlot);
        context.selectFirstPlayer(context.player1);
    }

    describe('after a Winter plot is revealed', function () {
        beforeEach(function () {
            setup(this, { plot: 'The Winds of Winter', opponentPlot: 'A Noble Cause' });
        });

        it('puts a Clansman character into play from your hand', function () {
            expect(this.player1).toAllowAbilityTrigger(this.torghenFlint);
            this.player1.triggerAbility(this.torghenFlint);

            expect(this.player1).toBeAbleToSelect(this.scout);
            expect(this.player1).not.toBeAbleToSelect(this.maester);

            this.player1.clickCard(this.scout);

            expect(this.scout.location).toBe('play area');
            expect(this.maester.location).toBe('hand');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('after an opponent reveals a Winter plot', function () {
        beforeEach(function () {
            setup(this, { plot: 'A Noble Cause', opponentPlot: 'The Winds of Winter' });
        });

        it('is offered as well', function () {
            expect(this.player1).toAllowAbilityTrigger(this.torghenFlint);
            this.player1.triggerAbility(this.torghenFlint);
            this.player1.clickCard(this.scout);

            expect(this.scout.location).toBe('play area');
        });
    });

    describe('after a non-Winter plot is revealed', function () {
        beforeEach(function () {
            setup(this, { plot: 'A Noble Cause', opponentPlot: 'A Noble Cause' });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.torghenFlint);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
