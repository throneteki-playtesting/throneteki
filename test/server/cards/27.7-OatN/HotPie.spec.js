describe('Hot Pie', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    'Hot Pie (OatN)',
                    "Black Wind's Crew",
                    'Arya Stark (Core)',
                    'Ser Colen of Greenpools',
                    'House Maester'
                ]
            },
            player2: { inPlay: ['Maester Wendamyr (Core)'] }
        });
        this.crew = this.player1.findCardByName("Black Wind's Crew", 'play area');
        this.arya = this.player1.findCardByName('Arya Stark', 'play area');
        this.loyal = this.player1.findCardByName('Ser Colen of Greenpools', 'play area');
        this.maester = this.player1.findCardByName('House Maester', 'play area');
        this.wendamyr = this.player2.findCardByName('Maester Wendamyr', 'play area');
        this.player1.clickMenu(this.hotPie, 'Give STR bonus based on keywords');
    });

    it('can choose a non-loyal character or Arya Stark', function () {
        expect(this.player1).toBeAbleToSelect(this.crew);
        expect(this.player1).toBeAbleToSelect(this.arya);
        expect(this.player1).toBeAbleToSelect(this.maester);
        expect(this.player1).toBeAbleToSelect(this.wendamyr);
        expect(this.player1).not.toBeAbleToSelect(this.loyal);
    });

    it('gives +1 STR for each keyword until the end of the phase', function () {
        const keywords = this.crew.getKeywords().length;
        expect(keywords).toBeGreaterThan(0);

        this.player1.clickCard(this.crew);

        expect(this.hotPie.kneeled).toBe(true);
        expect(this.crew.getStrength()).toBe(3 + keywords);
        expect(this.maester.getStrength()).toBe(2);
        expect(this.player1).isReadyToTakeAction();
    });

    it('gives no bonus to a character with no keywords', function () {
        this.player1.clickCard(this.maester);

        expect(this.maester.getStrength()).toBe(2);
    });
});
