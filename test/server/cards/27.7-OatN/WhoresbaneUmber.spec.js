describe('Whoresbane Umber', function () {
    describe('with fewer than 3 plots in the used pile', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    usedPlots: ['A Noble Cause', 'Sneak Attack'],
                    inPlay: ['Whoresbane Umber', 'Tumblestone Knight']
                },
                player2: { usedPlots: ['A Noble Cause'] }
            });
        });

        it('gains an intrigue icon and stealth', function () {
            expect(this.whoresbaneUmber.hasIcon('intrigue')).toBe(true);
            expect(this.whoresbaneUmber.hasKeyword('stealth')).toBe(true);
            expect(this.tumblestoneKnight.hasIcon('intrigue')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('with 3 plots in the used pile', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    usedPlots: ['A Noble Cause', 'Sneak Attack', 'Trading with the Pentoshi'],
                    inPlay: ['Whoresbane Umber']
                },
                player2: {}
            });
        });

        it('has neither the icon nor stealth', function () {
            expect(this.whoresbaneUmber.hasIcon('intrigue')).toBe(false);
            expect(this.whoresbaneUmber.hasKeyword('stealth')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
