describe('"Flowers of Spring"', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'setup',
            player1: {
                hand: [
                    '"Flowers of Spring"',
                    'Tithe',
                    '"The Bear and the Maiden Fair"',
                    'House Maester'
                ]
            },
            player2: { hand: ['Tithe', 'House Maester'] }
        });
        this.flowers = this.player1.findCardByName('"Flowers of Spring"', 'hand');
        this.tithe = this.player1.findCardByName('Tithe', 'hand');
        this.song = this.player1.findCardByName('"The Bear and the Maiden Fair"', 'hand');
        this.opponentTithe = this.player2.findCardByName('Tithe', 'hand');

        this.player1.setupCards('House Maester');
        this.player1.clickPrompt('Done');
        this.player2.setupCards('House Maester');
        this.player2.clickPrompt('Done');
        this.player1.clickPrompt('Pass');
        this.player1.selectPlot('Filler Plot');
        this.player2.selectPlot('Filler Plot');
        this.selectFirstPlayer(this.player1);
        this.player1.clickPrompt('Pass');
    });

    it('is offered when a phase begins', function () {
        expect(this.game.currentPhase).toBe('marshal');
        expect(this.player1).toAllowAbilityTrigger(this.flowers);
    });

    it('stops each player playing non-Song events until the end of the phase', function () {
        this.player1.triggerAbility(this.flowers);

        expect(this.flowers.location).toBe('discard pile');
        expect(this.player1Object.canPlay(this.tithe)).toBe(false);
        expect(this.player1Object.canPlay(this.song)).toBe(true);
        expect(this.player1).isReadyToTakeAction();
    });

    it('applies to the opponent as well', function () {
        this.player1.triggerAbility(this.flowers);
        this.player1.clickPrompt('Done');

        expect(this.player2Object.canPlay(this.opponentTithe)).toBe(false);
    });

    it('ends with the phase', function () {
        this.player1.triggerAbility(this.flowers);
        this.player1.clickPrompt('Done');
        this.player2.clickPrompt('Done');

        expect(this.game.currentPhase).toBe('challenge');
        expect(this.player1Object.canPlay(this.tithe)).toBe(true);
    });
});
