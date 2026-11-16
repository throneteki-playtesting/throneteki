describe('Blood Magic', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'plot',
            player1: {
                plotDeck: ['Blood Magic'],
                inPlay: ['Eddard Stark (Core)', 'House Maester', 'Robb Stark (Core)'],
                deadPile: [
                    'Jon Snow (Core)',
                    'Winterfell Steward',
                    'The Iron Fleet (FtR)',
                    'Samwell Tarly (Core)'
                ]
            },
            player2: {
                inPlay: ['Tywin Lannister (Core)'],
                deadPile: ['Aeron Damphair (Core)']
            }
        });
        this.eddard = this.player1.findCardByName('Eddard Stark', 'play area');
        this.maester = this.player1.findCardByName('House Maester', 'play area');
        this.robb = this.player1.findCardByName('Robb Stark', 'play area');
        this.jon = this.player1.findCardByName('Jon Snow', 'dead pile');
        this.steward = this.player1.findCardByName('Winterfell Steward', 'dead pile');
        this.army = this.player1.findCardByName('The Iron Fleet (FtR)', 'dead pile');
        this.sam = this.player1.findCardByName('Samwell Tarly', 'dead pile');
        this.opponentBrynden = this.player2.findCardByName('Tywin Lannister', 'play area');
        this.opponentDead = this.player2.findCardByName('Aeron Damphair', 'dead pile');
        this.player1.selectPlot('Blood Magic');
        this.player2.selectPlot('Filler Plot');
        this.selectFirstPlayer(this.player1);
    });

    it('kills a unique character you control, then puts another unique non-Army character from your dead pile into play', function () {
        expect(this.player1).toBeAbleToSelect(this.eddard);
        expect(this.player1).toBeAbleToSelect(this.robb);
        expect(this.player1).not.toBeAbleToSelect(this.maester);
        expect(this.player1).not.toBeAbleToSelect(this.opponentBrynden);

        this.player1.clickCard(this.eddard);

        expect(this.eddard.location).toBe('dead pile');
        expect(this.player1).toBeAbleToSelect(this.jon);
        expect(this.player1).toBeAbleToSelect(this.sam);
        expect(this.player1).not.toBeAbleToSelect(this.steward);
        expect(this.player1).not.toBeAbleToSelect(this.army);
        expect(this.player1).not.toBeAbleToSelect(this.eddard);
        expect(this.player1).not.toBeAbleToSelect(this.opponentDead);

        this.player1.clickCard(this.jon);

        expect(this.jon.location).toBe('play area');
        expect(this.sam.location).toBe('dead pile');
        expect(this.robb.location).toBe('play area');
        expect(this.maester.location).toBe('play area');
        expect(this.player1).isReadyToTakeAction();
    });
});
