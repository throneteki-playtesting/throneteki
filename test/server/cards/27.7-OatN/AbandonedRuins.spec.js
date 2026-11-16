describe('Abandoned Ruins', function () {
    describe('strength bonus', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Abandoned Ruins', 'House Dayne Knight'] },
                player2: { inPlay: ['Bastard in Hiding', 'House Maester'] }
            });
            this.knight = this.player1.findCardByName('House Dayne Knight', 'play area');
            this.opponentBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
        });

        it('gives your characters +1 STR while an opponent controls more characters', function () {
            expect(this.knight.getStrength()).toBe(3);
            expect(this.opponentBastard.getStrength()).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when you control as many characters as the opponent', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Abandoned Ruins', 'House Dayne Knight'] },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
        });

        it('gives no bonus', function () {
            expect(this.houseDayneKnight.getStrength()).toBe(2);
        });
    });

    describe('action', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: ['Abandoned Ruins', 'House Dayne Knight', 'Bastard in Hiding']
                },
                player2: { inPlay: ['House Dayne Knight'] }
            });
            this.ruins = this.abandonedRuins;
            this.martell = this.player1.findCardByName('House Dayne Knight', 'play area');
            this.baratheon = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.opponentMartell = this.player2.findCardByName('House Dayne Knight', 'play area');
        });

        it('kneels and sacrifices to return a Martell character you control to hand', function () {
            this.player1.clickMenu(this.ruins, 'Return a Martell character to hand');

            expect(this.player1).toBeAbleToSelect(this.martell);
            expect(this.player1).not.toBeAbleToSelect(this.baratheon);
            expect(this.player1).not.toBeAbleToSelect(this.opponentMartell);

            this.player1.clickCard(this.martell);

            expect(this.martell.location).toBe('hand');
            expect(this.ruins.location).toBe('discard pile');
            expect(this.baratheon.location).toBe('play area');
            expect(this.opponentMartell.location).toBe('play area');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Abandoned Ruins', 'House Dayne Knight'] },
                player2: {}
            });
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.abandonedRuins)).toBe('phase');
        });
    });
});
