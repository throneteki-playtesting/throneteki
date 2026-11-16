describe('Ser Alliser Thorne', function () {
    function setup(context, challenge) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                shadows: ['Ser Alliser Thorne (OatN)'],
                inPlay: ['Samwell Tarly (Core)', 'Bastard in Hiding', 'Tumblestone Knight'],
                gold: 5
            },
            player2: { inPlay: ['House Maester', 'Bastard in Hiding'] }
        });
        context.sam = context.player1.findCardByName('Samwell Tarly', 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.player1.clickPrompt(challenge);
        context.player1.clickCard(context.bastard);
        context.player1.clickPrompt('Done');
        context.player1.clickCard(context.serAlliserThorne);
    }

    describe('when a card comes out of shadows during a military challenge', function () {
        beforeEach(function () {
            setup(this, 'Military');
        });

        it('has a Night Watch character you control participate in the challenge', function () {
            expect(this.player1).toAllowAbilityTrigger(this.serAlliserThorne);
            this.player1.triggerAbility(this.serAlliserThorne);

            expect(this.player1).toBeAbleToSelect(this.sam);
            expect(this.player1).toBeAbleToSelect(this.serAlliserThorne);
            expect(this.player1).not.toBeAbleToSelect(this.bastard);
            expect(this.player1).not.toBeAbleToSelect(this.knight);

            this.player1.clickCard(this.sam);

            expect(this.game.currentChallenge.isAttacking(this.sam)).toBe(true);
            expect(this.game.currentChallenge.isAttacking(this.bastard)).toBe(true);
            expect(this.game.currentChallenge.isAttacking(this.knight)).toBe(false);
            expect(this.player2).isReadyToTakeAction();
        });
    });

    describe('when a card comes out of shadows during a challenge that is not military', function () {
        beforeEach(function () {
            setup(this, 'Power');
        });

        it('is not offered', function () {
            expect(this.serAlliserThorne.location).toBe('play area');
            expect(this.player1).not.toAllowAbilityTrigger(this.serAlliserThorne);
        });
    });
});
