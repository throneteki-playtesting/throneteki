describe('Rosby Road', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: { inPlay: ['Rosby Road'] },
            player2: { inPlay: ['Rosby Road'] }
        });
        this.road = this.player1.findCardByName('Rosby Road', 'play area');
        this.opponentRoad = this.player2.findCardByName('Rosby Road', 'play area');
    });

    it('gives its controller +1 initiative', function () {
        expect(this.player1Object.getInitiative()).toBe(1);
        expect(this.player2Object.getInitiative()).toBe(1);
        expect(this.player1).isReadyToTakeAction();
    });

    it('kneels and sacrifices to gain 3 gold', function () {
        const goldBefore = this.player1Object.gold;
        this.player1.clickCard(this.road);

        expect(this.road.location).toBe('discard pile');
        expect(this.player1Object.gold).toBe(goldBefore + 3);
        expect(this.opponentRoad.location).toBe('play area');
        expect(this.player1Object.getInitiative()).toBe(0);
        expect(this.player2Object.getInitiative()).toBe(1);
        expect(this.player1).isReadyToTakeAction();
    });
});
