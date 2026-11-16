describe("Brotherhood's Bounty", function () {
    describe('when you control no loyal characters', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    hand: ["Brotherhood's Bounty", "Brotherhood's Bounty"],
                    inPlay: ['House Maester'],
                    drawDeck: ['Hedge Knight', 'Hedge Knight', 'Hedge Knight']
                },
                player2: { inPlay: ['Ser Colen of Greenpools'] }
            });
            [this.bounty, this.secondBounty] = this.player1.filterCardsByName(
                "Brotherhood's Bounty",
                'hand'
            );
        });

        it('gains gold and draws cards equal to the claim value', function () {
            const goldBefore = this.player1Object.gold;
            const handBefore = this.player1Object.hand.length;
            this.player1.clickCard(this.bounty);

            expect(this.player1Object.gold).toBe(goldBefore + 1);
            expect(this.player1Object.hand.length).toBe(handBefore - 1 + 1);
            expect(this.bounty.location).toBe('discard pile');
            expect(this.player2Object.gold).toBe(this.player2Object.gold);
            expect(this.player1).isReadyToTakeAction();
        });

        it('can only be played once per round', function () {
            this.player1.clickCard(this.bounty);

            expect(this.player1.actionUnavailableReason(this.secondBounty)).toBe('limit');
        });
    });

    describe('when you control a loyal character', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    hand: ["Brotherhood's Bounty"],
                    inPlay: ['Ser Colen of Greenpools']
                },
                player2: {}
            });
        });

        it('cannot be played', function () {
            this.player1.clickCard(this.brotherhoodsBounty);

            expect(this.brotherhoodsBounty.location).toBe('hand');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { hand: ["Brotherhood's Bounty"], inPlay: ['House Maester'] },
                player2: {}
            });
        });

        it('cannot be played', function () {
            expect(this.player1.actionUnavailableReason(this.brotherhoodsBounty)).toBe('phase');
        });
    });
});
