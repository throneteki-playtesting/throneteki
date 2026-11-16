describe("The God's Eye", function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: {
                shadows: ["The Merman's Shield", 'Alan of Rosby', "Cheesemonger's Galley"],
                inPlay: ["The God's Eye (OatN)"],
                gold: 4
            },
            player2: {}
        });
        this.shield = this.player1.findCardByName("The Merman's Shield", 'shadows');
        this.alan = this.player1.findCardByName('Alan of Rosby', 'shadows');
        this.galley = this.player1.findCardByName("Cheesemonger's Galley", 'shadows');
    });

    it('reduces the cost of the next out-of-faction card brought out of shadows by 3', function () {
        this.player1.clickCard(this.theGodsEye);

        expect(this.theGodsEye.kneeled).toBe(true);

        this.player1.clickCard(this.galley);

        expect(this.galley.location).toBe('play area');
        expect(this.player1Object.gold).toBe(4);
    });

    it('does not reduce the cost of a card from your own faction, and keeps waiting for a legal card', function () {
        this.player1.clickCard(this.theGodsEye);
        this.player1.clickCard(this.shield);

        expect(this.shield.location).toBe('play area');
        expect(this.player1Object.gold).toBe(0);

        this.player1.clickCard(this.alan);

        expect(this.alan.location).toBe('play area');
        expect(this.player1Object.gold).toBe(0);
    });
});
