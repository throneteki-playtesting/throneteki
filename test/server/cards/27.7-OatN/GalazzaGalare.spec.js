describe('Galazza Galare', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                faction: 'targaryen',
                inPlay: ['Galazza Galare (OatN)', 'Bastard in Hiding']
            },
            player2: { inPlay: ['Tumblestone Knight', 'Tumblestone Knight', 'Tumblestone Knight'] }
        });
        this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
        [this.knight, this.secondKnight] = this.player2.filterCardsByName(
            'Tumblestone Knight',
            'play area'
        );
        this.powerBefore = this.player1Object.faction.power;
    });

    it('gains 1 power for each player when nobody applied military claim', function () {
        this.player1.clickPrompt('Done');
        this.player2.clickPrompt('Done');

        expect(this.player1).toAllowAbilityTrigger(this.galazzaGalare);
        this.player1.triggerAbility(this.galazzaGalare);

        expect(this.player1Object.faction.power).toBe(this.powerBefore + 2);
        expect(this.player2Object.faction.power).toBe(0);
        expect(this.player1).isReadyToTakeAction();
    });

    it('does not count the controller when they applied military claim', function () {
        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.bastard);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickCard(this.knight);
        const powerAfterChallenge = this.player1Object.faction.power;
        this.player1.clickPrompt('Done');
        this.player2.clickPrompt('Done');

        this.player1.triggerAbility(this.galazzaGalare);

        expect(this.player1Object.faction.power).toBe(powerAfterChallenge + 1);
        expect(this.player1).isReadyToTakeAction();
    });

    it('does not count an opponent who applied military claim', function () {
        this.player1.clickPrompt('Done');
        this.player2.clickPrompt('Military');
        this.player2.clickCard(this.knight);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player1.clickCard(this.bastard);
        this.player2.clickPrompt('Done');

        this.player1.triggerAbility(this.galazzaGalare);

        expect(this.player1Object.faction.power).toBe(this.powerBefore + 1);
        expect(this.player1).isReadyToTakeAction();
    });

    it('does not count an intrigue claim as military claim', function () {
        this.player1.clickPrompt('Intrigue');
        this.player1.clickCard(this.galazzaGalare);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        const powerAfterChallenge = this.player1Object.faction.power;
        this.player1.clickPrompt('Done');
        this.player2.clickPrompt('Done');

        this.player1.triggerAbility(this.galazzaGalare);

        expect(this.player1Object.faction.power).toBe(powerAfterChallenge + 2);
        expect(this.player1).isReadyToTakeAction();
    });
});
