describe("The King's Prize", function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    { card: 'Eddard Stark (Core)', attachments: ["The King's Prize"] },
                    { card: 'Tumblestone Knight', attachments: ["The King's Prize"] }
                ]
            },
            player2: { inPlay: [{ card: 'Bastard in Hiding', attachments: ["The King's Prize"] }] }
        });
        this.eddard = this.player1.findCardByName('Eddard Stark', 'play area');
        this.knight = this.player1.findCardByName('Tumblestone Knight', 'play area');
        this.bastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
    });

    it('does not change STR outside a challenge', function () {
        expect(this.eddard.getStrength()).toBe(5);
        expect(this.knight.getStrength()).toBe(2);
        expect(this.bastard.getStrength()).toBe(2);
        expect(this.player1).isReadyToTakeAction();
    });

    it('sets the attached character STR to 3 during a power challenge', function () {
        this.player1.clickPrompt('Power');
        this.player1.clickCard(this.eddard);
        this.player1.clickCard(this.knight);
        this.player1.clickPrompt('Done');

        expect(this.eddard.getStrength()).toBe(3);
        expect(this.knight.getStrength()).toBe(3);
        expect(this.bastard.getStrength()).toBe(3);
        expect(this.player1).isReadyToTakeAction();
    });

    it('does not change STR during a military challenge', function () {
        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.eddard);
        this.player1.clickPrompt('Done');

        expect(this.eddard.getStrength()).toBe(5);
        expect(this.knight.getStrength()).toBe(2);
        expect(this.player1).isReadyToTakeAction();
    });
});
