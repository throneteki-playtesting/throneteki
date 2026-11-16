describe('Beneath the Red Keep', function () {
    describe('during the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    plot: 'Beneath the Red Keep',
                    inPlay: ['Rosby Road', 'Tunnels of the Red Keep', 'House Maester']
                },
                player2: { inPlay: ['Rosby Road', 'Bastard in Hiding'] }
            });
            this.road = this.player1.findCardByName('Rosby Road', 'play area');
            this.opponentRoad = this.player2.findCardByName('Rosby Road', 'play area');
        });

        it('stops both players triggering abilities on cards without shadow', function () {
            expect(this.player1.actionUnavailableReason(this.road)).toBe('cannotTrigger');
        });

        it('still allows abilities on cards with shadow', function () {
            expect(this.player1.actionUnavailableReason(this.tunnelsOfTheRedKeep)).toBeUndefined();
            this.player1.clickMenu(this.tunnelsOfTheRedKeep, 'Kneel and return to shadows');

            expect(this.tunnelsOfTheRedKeep.location).toBe('shadows');
            expect(this.player1).isReadyToTakeAction();
        });

        it('does not stop plots or other cards from existing', function () {
            expect(this.opponentRoad.location).toBe('play area');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    plot: 'Beneath the Red Keep',
                    inPlay: ['Winterfell Steward']
                },
                player2: {}
            });
        });

        it('does not stop abilities from being triggered', function () {
            expect(this.player1.actionUnavailableReason(this.winterfellSteward)).toBeUndefined();
        });
    });
});
