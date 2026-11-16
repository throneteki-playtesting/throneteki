describe('Liddle Scout', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: { inPlay: ['Liddle Scout', 'Bastard in Hiding'] },
            player2: {
                inPlay: ['Bastard in Hiding', 'Crannogmen (AHaH)']
            }
        });
        this.scout = this.liddleScout;
        this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
        this.shadowDefender = this.player2.findCardByName('Crannogmen (AHaH)', 'play area');
        this.normalDefender = this.player2.findCardByName('Bastard in Hiding', 'play area');
    });

    it('stops characters with shadow from being declared as defenders while attacking', function () {
        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.scout);
        this.player1.clickPrompt('Done');
        this.player1.clickPrompt('Done');
        this.skipActionWindow();

        expect(this.player2).toBeAbleToSelect(this.normalDefender);
        expect(this.player2).not.toBeAbleToSelect(this.shadowDefender);
        this.player2.clickCard(this.normalDefender);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickCard(this.normalDefender);

        expect(this.normalDefender.location).toBe('dead pile');
        expect(this.shadowDefender.location).toBe('play area');
        expect(this.player1).isReadyToTakeAction();
    });

    it('does not stop characters with shadow from defending when Liddle Scout is not attacking', function () {
        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.bastard);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();

        expect(this.player2).toBeAbleToSelect(this.normalDefender);
        expect(this.player2).toBeAbleToSelect(this.shadowDefender);
        this.player2.clickCard(this.normalDefender);
        this.player2.clickCard(this.shadowDefender);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();

        expect(this.player1).isReadyToTakeAction();
    });
});
