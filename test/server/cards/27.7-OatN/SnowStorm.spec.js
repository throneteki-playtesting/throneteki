describe('Snow Storm', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'plot',
            player1: {
                plotDeck: ['Snow Storm'],
                inPlay: [
                    { card: 'Eddard Stark (Core)', attachments: ['Bodyguard'] },
                    'The Roseroad',
                    { card: 'The Kingsroad', kneeling: true }
                ]
            },
            player2: {
                inPlay: [
                    {
                        card: 'House Dayne Knight',
                        attachments: [{ card: 'Condemned (NMG)', owner: 'player1' }]
                    },
                    'The Roseroad'
                ]
            }
        });
        this.eddard = this.player1.findCardByName('Eddard Stark', 'play area');
        this.bodyguard = this.player1.findCardByName('Bodyguard', 'play area');
        this.roseroad = this.player1.findCardByName('The Roseroad', 'play area');
        this.kingsroad = this.player1.findCardByName('The Kingsroad', 'play area');
        this.knight = this.player2.findCardByName('House Dayne Knight', 'play area');
        this.condemned = this.player1.findCardByName('Condemned', 'play area');
        this.opponentRoseroad = this.player2.findCardByName('The Roseroad', 'play area');
        this.player1.selectPlot('Snow Storm');
        this.player2.selectPlot('Filler Plot');
        this.selectFirstPlayer(this.player1);
    });

    it('kneels each attachment and location, and no characters', function () {
        expect(this.bodyguard.kneeled).toBe(true);
        expect(this.roseroad.kneeled).toBe(true);
        expect(this.kingsroad.kneeled).toBe(true);
        expect(this.condemned.kneeled).toBe(true);
        expect(this.opponentRoseroad.kneeled).toBe(true);
        expect(this.eddard.kneeled).toBe(false);
        expect(this.knight.kneeled).toBe(false);
        expect(this.player1).isReadyToTakeAction();
    });
});
