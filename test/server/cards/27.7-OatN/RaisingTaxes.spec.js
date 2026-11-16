describe('Raising Taxes', function () {
    const plotIncome = 3;

    beforeEach(function () {
        this.setupTest({
            phase: 'plot',
            player1: {
                plotDeck: ['Raising Taxes'],
                inPlay: [
                    { card: 'House Maester', gold: 2 },
                    { card: 'Bastard in Hiding', gold: 1 },
                    'Tumblestone Knight'
                ]
            },
            player2: {
                inPlay: [{ card: 'House Maester', gold: 3 }]
            }
        });
        [this.maester, this.bastard, this.knight] = [
            this.player1.findCardByName('House Maester', 'play area'),
            this.player1.findCardByName('Bastard in Hiding', 'play area'),
            this.player1.findCardByName('Tumblestone Knight', 'play area')
        ];
        this.opponentMaester = this.player2.findCardByName('House Maester', 'play area');
        this.player1.selectPlot('Raising Taxes');
        this.player2.selectPlot('Filler Plot');
    });

    it('moves all gold on characters to its controller gold pool', function () {
        const goldBefore = this.player1Object.gold;
        this.selectFirstPlayer(this.player1);

        expect(this.maester.gold).toBe(0);
        expect(this.bastard.gold).toBe(0);
        expect(this.knight.gold).toBe(0);
        expect(this.player1Object.gold).toBe(goldBefore + 3 + 3 + plotIncome);
        expect(this.opponentMaester.gold).toBe(0);
        expect(this.player2Object.gold).toBe(0);
        expect(this.player1).isReadyToTakeAction();
    });
});
