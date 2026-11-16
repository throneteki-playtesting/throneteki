describe('Ser Axell Florent', function () {
    function setup(context, { player1 = [], player2 = [] }) {
        context.setupTest({
            phase: 'challenge',
            player1: { inPlay: ['Ser Axell Florent (OatN)', ...player1] },
            player2: { inPlay: player2 }
        });
        context.completeChallengesPhase();
    }

    describe('when you win dominance and control the only King in play', function () {
        beforeEach(function () {
            setup(this, { player1: ['Viserys Targaryen (AtSK)'], player2: ['House Maester'] });
            this.viserys = this.player1.findCardByName('Viserys Targaryen', 'play area');
        });

        it('has that King gain 1 power', function () {
            expect(this.player1).toAllowAbilityTrigger(this.serAxellFlorent);

            this.player1.triggerAbility(this.serAxellFlorent);

            expect(this.viserys.power).toBe(1);
            expect(this.serAxellFlorent.power).toBe(0);
        });
    });

    describe('when you win dominance and control no King', function () {
        beforeEach(function () {
            setup(this, { player2: ['House Maester'] });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.serAxellFlorent);
        });
    });

    describe('when you win dominance but there is another King in play', function () {
        beforeEach(function () {
            setup(this, {
                player1: ['Viserys Targaryen (AtSK)'],
                player2: ['Tommen Baratheon (LoCR)']
            });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.serAxellFlorent);
        });
    });

    describe('when an opponent controls the only King', function () {
        beforeEach(function () {
            setup(this, { player2: ['Tommen Baratheon (LoCR)'] });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.serAxellFlorent);
        });
    });

    describe('when you do not win dominance', function () {
        beforeEach(function () {
            setup(this, {
                player1: ['Viserys Targaryen (AtSK)'],
                player2: ['Eddard Stark (Core)', 'Eddard Stark (WotN)']
            });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.serAxellFlorent);
        });
    });
});
