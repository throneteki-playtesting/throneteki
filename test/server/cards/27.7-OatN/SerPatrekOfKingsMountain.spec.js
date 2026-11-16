describe("Ser Patrek of King's Mountain", function () {
    function setup(context, plot) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                plot,
                inPlay: ["Ser Patrek of King's Mountain", 'Bastard in Hiding']
            },
            player2: { inPlay: ['Tumblestone Knight'] }
        });
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player2.findCardByName('Tumblestone Knight', 'play area');
    }

    function winMilitaryChallengeWith(context, attacker) {
        context.player1.clickPrompt('Military');
        context.player1.clickCard(attacker);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('with a Winter plot revealed', function () {
        beforeEach(function () {
            setup(this, 'Barring the Gates');
        });

        it('stands him after he participates in a won challenge', function () {
            winMilitaryChallengeWith(this, this.serPatrekOfKingsMountain);

            expect(this.serPatrekOfKingsMountain.kneeled).toBe(true);
            expect(this.player1).toAllowAbilityTrigger(this.serPatrekOfKingsMountain);

            this.player1.triggerAbility(this.serPatrekOfKingsMountain);
            this.player2.clickCard(this.knight);

            expect(this.serPatrekOfKingsMountain.kneeled).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });

        it('is not offered when he is not participating', function () {
            winMilitaryChallengeWith(this, this.bastard);
            this.player2.clickCard(this.knight);

            expect(this.player1).not.toAllowAbilityTrigger(this.serPatrekOfKingsMountain);
            expect(this.serPatrekOfKingsMountain.kneeled).toBe(false);
        });
    });

    describe('with no Winter plot revealed', function () {
        beforeEach(function () {
            setup(this, 'A Noble Cause');
        });

        it('is not offered', function () {
            winMilitaryChallengeWith(this, this.serPatrekOfKingsMountain);
            this.player2.clickCard(this.knight);

            expect(this.player1).not.toAllowAbilityTrigger(this.serPatrekOfKingsMountain);
            expect(this.serPatrekOfKingsMountain.kneeled).toBe(true);
        });
    });

    describe('with a Winter plot revealed by the opponent', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: ["Ser Patrek of King's Mountain"] },
                player2: { plot: 'Barring the Gates', inPlay: ['Tumblestone Knight'] }
            });
            this.knight = this.player2.findCardByName('Tumblestone Knight', 'play area');
        });

        it('stands him as well', function () {
            winMilitaryChallengeWith(this, this.serPatrekOfKingsMountain);

            expect(this.player1).toAllowAbilityTrigger(this.serPatrekOfKingsMountain);
            this.player1.triggerAbility(this.serPatrekOfKingsMountain);
            this.player2.clickCard(this.knight);

            expect(this.serPatrekOfKingsMountain.kneeled).toBe(false);
        });
    });
});
