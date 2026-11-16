describe('Iron Fleet Detatchment', function () {
    describe('during the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: ['Iron Fleet Detatchment'], gold: 1 },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
        });

        it('pays 1 gold to be treated as a Raider character until the end of the phase', function () {
            expect(this.ironFleetDetatchment.getType()).toBe('location');

            this.player1.clickMenu(this.ironFleetDetatchment, 'Treat as character');

            expect(this.player1Object.gold).toBe(0);
            expect(this.ironFleetDetatchment.getType()).toBe('character');
            expect(this.ironFleetDetatchment.hasTrait('Raider')).toBe(true);
            expect(this.ironFleetDetatchment.hasKeyword('stealth')).toBe(true);
            expect(this.ironFleetDetatchment.getStrength()).toBe(2);
            expect(this.ironFleetDetatchment.hasIcon('military')).toBe(true);
            expect(this.ironFleetDetatchment.hasIcon('power')).toBe(true);
            expect(this.ironFleetDetatchment.hasIcon('intrigue')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });

        it('can then attack', function () {
            this.player1.clickMenu(this.ironFleetDetatchment, 'Treat as character');
            this.player1.clickPrompt('Military');

            expect(this.player1).toBeAbleToSelect(this.ironFleetDetatchment);
        });

        it('reverts to a location after the phase', function () {
            this.player1.clickMenu(this.ironFleetDetatchment, 'Treat as character');
            this.completeChallengesPhase();

            expect(this.ironFleetDetatchment.getType()).toBe('location');
        });
    });

    describe('without enough gold', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: ['Iron Fleet Detatchment'], gold: 0 },
                player2: {}
            });
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.ironFleetDetatchment)).toBe('cost');
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Iron Fleet Detatchment'], gold: 1 },
                player2: {}
            });
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.ironFleetDetatchment)).toBe('phase');
        });
    });
});
