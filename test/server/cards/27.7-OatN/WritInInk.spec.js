describe('Writ in Ink', function () {
    function setup(context, challenge) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                hand: ['Writ in Ink'],
                inPlay: ['House Maester', 'Earl Harlaw', 'Bastard in Hiding'],
                gold: 1
            },
            player2: { inPlay: ['House Maester'] }
        });
        context.writ = context.player1.findCardByName('Writ in Ink', 'hand');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.earl = context.player1.findCardByName('Earl Harlaw', 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.opponentMaester = context.player2.findCardByName('House Maester', 'play area');
        context.player1.clickPrompt(challenge);
        context.player1.clickCard(context.maester);
        context.player1.clickPrompt('Done');
    }

    describe('during an intrigue challenge', function () {
        beforeEach(function () {
            setup(this, 'Intrigue');
            this.player1.clickCard(this.writ);
        });

        it('can only choose a House Harlaw character with a military icon that is not participating', function () {
            expect(this.player1).toBeAbleToSelect(this.earl);
            expect(this.player1).not.toBeAbleToSelect(this.bastard);
            expect(this.player1).not.toBeAbleToSelect(this.maester);
            expect(this.player1).not.toBeAbleToSelect(this.opponentMaester);
        });

        it('has the character participate in the challenge on your side', function () {
            this.player1.clickCard(this.earl);

            expect(this.game.currentChallenge.isAttacking(this.earl)).toBe(true);
            expect(this.writ.location).toBe('discard pile');
            expect(this.player2).isReadyToTakeAction();
        });
    });

    describe('during a challenge that is not an intrigue challenge', function () {
        beforeEach(function () {
            setup(this, 'Power');
        });

        it('cannot be played', function () {
            expect(this.player1.actionUnavailableReason(this.writ)).toBeDefined();
            this.player1.clickCard(this.writ);
            expect(this.writ.location).toBe('hand');
        });
    });
});
