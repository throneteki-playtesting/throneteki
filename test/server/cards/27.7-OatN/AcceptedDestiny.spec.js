describe('Accepted Destiny', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: {
                faction: 'baratheon',
                hand: ['Accepted Destiny'],
                inPlay: [
                    { card: 'Bastard in Hiding', power: 2 },
                    { card: 'House Maester', power: 1 },
                    'Tumblestone Knight'
                ],
                gold: 5
            },
            player2: {}
        });
        this.destiny = this.player1.findCardByName('Accepted Destiny', 'hand');
        this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
        this.maester = this.player1.findCardByName('House Maester', 'play area');
        this.knight = this.player1.findCardByName('Tumblestone Knight', 'play area');
    });

    it('can only be attached to Baratheon characters', function () {
        this.player1.clickCard(this.destiny);

        expect(this.player1).toBeAbleToSelect(this.bastard);
        expect(this.player1).not.toBeAbleToSelect(this.maester);
        expect(this.player1).not.toBeAbleToSelect(this.knight);
    });

    it('gives +1 STR for each power on the attached character', function () {
        this.player1.clickCard(this.destiny);
        this.player1.clickCard(this.bastard);

        expect(this.bastard.getStrength()).toBe(4);
        expect(this.maester.getStrength()).toBe(2);
        expect(this.knight.getStrength()).toBe(2);
        expect(this.player1).isReadyToTakeAction();
    });
});
