describe('Bright-Eyed Recruit', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: {
                inPlay: [
                    'Bright-Eyed Recruit',
                    { card: 'Highborn Recruit (ChoS)', kneeling: true },
                    { card: 'Arry', kneeling: false },
                    { card: 'Samwell Tarly (Core)', kneeling: true }
                ]
            },
            player2: {
                inPlay: [
                    { card: 'Bastard in Hiding', kneeling: true },
                    { card: 'House Maester', kneeling: false },
                    'Tumblestone Knight'
                ]
            }
        });
        this.highborn = this.player1.findCardByName('Highborn Recruit', 'play area');
        this.arry = this.player1.findCardByName('Arry', 'play area');
        this.sam = this.player1.findCardByName('Samwell Tarly', 'play area');
        this.kneelingOpponent = this.player2.findCardByName('Bastard in Hiding', 'play area');
        this.standingOpponent = this.player2.findCardByName('House Maester', 'play area');
        this.attacker = this.player2.findCardByName('Tumblestone Knight', 'play area');

        this.player2.clickPrompt('Military');
        this.player2.clickCard(this.attacker);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player1.clickCard(this.brightEyedRecruit);
        this.player1.clickPrompt('Done');
    });

    it('can stand another Recruit or a character owned by an opponent', function () {
        expect(this.player1).toAllowAbilityTrigger(this.brightEyedRecruit);
        this.player1.triggerAbility(this.brightEyedRecruit);

        expect(this.player1).toBeAbleToSelect(this.highborn);
        expect(this.player1).toBeAbleToSelect(this.kneelingOpponent);
        expect(this.player1).not.toBeAbleToSelect(this.arry);
        expect(this.player1).not.toBeAbleToSelect(this.sam);
        expect(this.player1).not.toBeAbleToSelect(this.standingOpponent);
        expect(this.player1).not.toBeAbleToSelect(this.brightEyedRecruit);
    });

    it('stands the chosen character', function () {
        this.player1.triggerAbility(this.brightEyedRecruit);
        this.player1.clickCard(this.highborn);

        expect(this.highborn.kneeled).toBe(false);
        expect(this.kneelingOpponent.kneeled).toBe(true);
        expect(this.sam.kneeled).toBe(true);
    });
});
