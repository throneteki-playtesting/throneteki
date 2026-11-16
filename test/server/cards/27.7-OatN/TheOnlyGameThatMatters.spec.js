describe('The Only Game That Matters', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                hand: ['The Only Game That Matters'],
                inPlay: ['Bastard in Hiding'],
                gold: 1
            },
            player2: {
                inPlay: ['Tumblestone Knight', 'House Dayne Knight', 'Winterfell Steward']
            }
        });
        this.event = this.player1.findCardByName('The Only Game That Matters', 'hand');
        this.attacker = this.player1.findCardByName('Bastard in Hiding', 'play area');
        this.noIntrigue = this.player2.findCardByName('Tumblestone Knight', 'play area');
        this.withIntrigue = this.player2.findCardByName('House Dayne Knight', 'play area');
        this.notDefending = this.player2.findCardByName('Winterfell Steward', 'play area');

        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.attacker);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickCard(this.noIntrigue);
        this.player2.clickCard(this.withIntrigue);
        this.player2.clickPrompt('Done');
    });

    it('can only choose a defending character without an intrigue icon', function () {
        this.player1.clickCard(this.event);

        expect(this.player1).toBeAbleToSelect(this.noIntrigue);
        expect(this.player1).not.toBeAbleToSelect(this.withIntrigue);
        expect(this.player1).not.toBeAbleToSelect(this.notDefending);
        expect(this.player1).not.toBeAbleToSelect(this.attacker);
    });

    it('stops the chosen character contributing STR to the challenge', function () {
        const defenderStrength = this.game.currentChallenge.defenderStrength;
        this.player1.clickCard(this.event);
        this.player1.clickCard(this.noIntrigue);

        expect(this.game.currentChallenge.defenderStrength).toBe(defenderStrength - 2);
        expect(this.noIntrigue.getStrength()).toBe(2);
        expect(this.event.location).toBe('discard pile');
    });
});
