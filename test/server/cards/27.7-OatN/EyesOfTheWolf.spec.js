describe('Eyes of the Wolf', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                hand: ['Eyes of the Wolf'],
                inPlay: [
                    { card: 'Summer (Core)', kneeling: true },
                    'House Maester',
                    'Direwolf Pup',
                    'Bastard in Hiding'
                ],
                gold: 1
            },
            player2: { inPlay: [{ card: 'Summer (Core)', kneeling: true }] }
        });
        this.eyes = this.player1.findCardByName('Eyes of the Wolf', 'hand');
        this.summer = this.player1.findCardByName('Summer', 'play area');
        this.maester = this.player1.findCardByName('House Maester', 'play area');
        this.pup = this.player1.findCardByName('Direwolf Pup', 'play area');
        this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
        this.opponentSummer = this.player2.findCardByName('Summer', 'play area');
    });

    it('kneels a non-Direwolf character to stand a Direwolf, which gains the knelt character icons', function () {
        this.player1.clickCard(this.eyes);

        expect(this.player1).toBeAbleToSelect(this.maester);
        expect(this.player1).toBeAbleToSelect(this.bastard);
        expect(this.player1).not.toBeAbleToSelect(this.summer);
        expect(this.player1).not.toBeAbleToSelect(this.pup);

        this.player1.clickCard(this.maester);

        expect(this.player1).toBeAbleToSelect(this.summer);
        expect(this.player1).toBeAbleToSelect(this.opponentSummer);
        expect(this.player1).not.toBeAbleToSelect(this.maester);

        this.player1.clickCard(this.summer);

        expect(this.maester.kneeled).toBe(true);
        expect(this.summer.kneeled).toBe(false);
        expect(this.summer.hasIcon('military')).toBe(true);
        expect(this.summer.hasIcon('intrigue')).toBe(true);
        expect(this.summer.hasIcon('power')).toBe(true);
        expect(this.pup.hasIcon('intrigue')).toBe(false);
        expect(this.opponentSummer.kneeled).toBe(true);
        expect(this.eyes.location).toBe('discard pile');
        expect(this.player1).isReadyToTakeAction();
    });
});
