describe("Streets of King's Landing", function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                agenda: "Streets of King's Landing",
                inPlay: [
                    'House Maester',
                    "Tobho Mott's Armory",
                    'The Iron Throne (Core)',
                    'The Roseroad'
                ]
            },
            player2: { inPlay: ['House Maester', "Tobho Mott's Armory"] }
        });
        this.armory = this.player1.findCardByName("Tobho Mott's Armory", 'play area');
        this.throne = this.player1.findCardByName('The Iron Throne (Core)', 'play area');
        this.roseroad = this.player1.findCardByName('The Roseroad', 'play area');
        this.opponentArmory = this.player2.findCardByName("Tobho Mott's Armory", 'play area');
        this.player1.clickPrompt('Intrigue');
        this.player1.clickCard(this.player1.findCardByName('House Maester', 'play area'));
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
    });

    it('does not gain power from the unopposed challenge bonus', function () {
        this.player1.clickPrompt('Pass');

        expect(this.player1Object.faction.power).toBe(0);
    });

    it("kneels a King's Landing location to have it gain 1 power", function () {
        expect(this.player1).toAllowAbilityTrigger(this.streetsOfKingsLanding);
        this.player1.triggerAbility(this.streetsOfKingsLanding);

        expect(this.player1).toBeAbleToSelect(this.armory);
        expect(this.player1).toBeAbleToSelect(this.throne);
        expect(this.player1).not.toBeAbleToSelect(this.roseroad);
        expect(this.player1).not.toBeAbleToSelect(this.opponentArmory);

        this.player1.clickCard(this.throne);

        expect(this.throne.kneeled).toBe(true);
        expect(this.throne.power).toBe(1);
        expect(this.armory.power).toBe(0);
        expect(this.player1).isReadyToTakeAction();
    });
});
