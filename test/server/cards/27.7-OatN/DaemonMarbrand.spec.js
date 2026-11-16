describe('Damon Marbrand', function () {
    function setup(context, opponentHand) {
        context.setupTest({
            phase: 'challenge',
            player1: { inPlay: ['Damon Marbrand'] },
            player2: {
                hand: opponentHand,
                inPlay: ['Bastard in Hiding', 'House Maester']
            }
        });
        context.bastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
        context.maester = context.player2.findCardByName('House Maester', 'play area');
        context.player1.clickPrompt('Intrigue');
        context.player1.clickCard(context.damonMarbrand);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('when a character is discarded from an opponent hand', function () {
        beforeEach(function () {
            setup(this, ['Hedge Knight']);
        });

        it('has that player choose a character they control and return it to their hand', function () {
            expect(this.player1).toAllowAbilityTrigger(this.damonMarbrand);
            this.player1.triggerAbility(this.damonMarbrand);

            expect(this.player2).toBeAbleToSelect(this.bastard);
            expect(this.player2).toBeAbleToSelect(this.maester);
            expect(this.player2).not.toBeAbleToSelect(this.damonMarbrand);

            this.player2.clickCard(this.maester);

            expect(this.maester.location).toBe('hand');
            expect(this.bastard.location).toBe('play area');
            expect(this.damonMarbrand.location).toBe('play area');
        });
    });

    describe('when a non-character is discarded from an opponent hand', function () {
        beforeEach(function () {
            setup(this, ['Tithe']);
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.damonMarbrand);
            expect(this.bastard.location).toBe('play area');
        });
    });
});
