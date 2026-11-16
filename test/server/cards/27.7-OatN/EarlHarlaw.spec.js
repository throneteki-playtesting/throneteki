describe('Earl Harlaw', function () {
    const hand = [
        'Hedge Knight',
        'Hedge Knight',
        'Hedge Knight',
        'House Maester',
        'House Maester',
        'House Maester',
        'Bastard in Hiding',
        'Bastard in Hiding'
    ];

    describe('when Earl Harlaw is in play', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: ['Earl Harlaw'], hand },
                player2: { hand }
            });
            this.completeChallengesPhase();
        });

        it('makes each player discard down to reserve at random without a prompt', function () {
            expect(this.player1Object.hand.length).toBe(6);
            expect(this.player2Object.hand.length).toBe(6);
            expect(this.player1Object.discardPile.length).toBe(2);
            expect(this.player2Object.discardPile.length).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when Earl Harlaw is not in play', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: ['House Maester'], hand },
                player2: { hand }
            });
            this.completeChallengesPhase();
        });

        it('lets the player choose what to discard', function () {
            expect(this.player1).toHavePrompt(
                'Select 2 cards to discard down to reserve (top first)'
            );
        });
    });
});
