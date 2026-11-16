describe("Cheesemonger's Galley", function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'plot',
            player1: { faction: 'targaryen', inPlay: ["Cheesemonger's Galley"] },
            player2: { inPlay: ["Cheesemonger's Galley"] }
        });
        this.galley = this.player1.findCardByName("Cheesemonger's Galley", 'play area');
        this.opponentGalley = this.player2.findCardByName("Cheesemonger's Galley", 'play area');
        this.player1.selectPlot('Filler Plot');
        this.player2.selectPlot('Filler Plot');
        this.selectFirstPlayer(this.player1);
    });

    it('is offered to each player as they collect income', function () {
        expect(this.player1).toAllowAbilityTrigger(this.galley);
        expect(this.player2).not.toAllowAbilityTrigger(this.opponentGalley);
        this.player1.triggerAbility(this.galley);
        this.player1.clickPrompt('Done');

        expect(this.player2).toAllowAbilityTrigger(this.opponentGalley);
    });

    it('returns to shadows to gain 1 gold', function () {
        const goldBefore = this.player1Object.gold;
        this.player1.triggerAbility(this.galley);

        expect(this.galley.location).toBe('shadows');
        expect(this.opponentGalley.location).toBe('play area');
        expect(this.player1Object.gold).toBe(goldBefore + 1);
    });
});
