describe('Areo Hotah', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: { inPlay: ['Areo Hotah (OatN)', 'Tumblestone Knight'] },
            player2: { inPlay: ['Bastard in Hiding'] }
        });
        this.knight = this.player1.findCardByName('Tumblestone Knight', 'play area');
        this.opponentBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
    });

    it('gains 3 power when no challenge was initiated against you', function () {
        this.player2.clickPrompt('Done');
        this.player1.clickPrompt('Done');

        expect(this.player1).toAllowAbilityTrigger(this.areoHotah);
        this.player1.triggerAbility(this.areoHotah);

        expect(this.areoHotah.power).toBe(3);
        expect(this.knight.power).toBe(0);
    });

    it('gains 1 power for each challenge type not initiated against you', function () {
        this.player2.clickPrompt('Military');
        this.player2.clickCard(this.opponentBastard);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player1.clickCard(this.knight);
        this.player2.clickPrompt('Done');
        this.player1.clickPrompt('Done');

        this.player1.triggerAbility(this.areoHotah);

        expect(this.areoHotah.power).toBe(2);
    });

    it('is not affected by challenges the controller initiated', function () {
        this.player2.clickPrompt('Done');
        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.areoHotah);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickCard(this.opponentBastard);
        this.player1.clickPrompt('Done');
        this.player1.triggerAbility(this.areoHotah);

        expect(this.areoHotah.power).toBe(3);
    });
});
