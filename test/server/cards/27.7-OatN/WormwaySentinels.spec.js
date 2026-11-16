describe('Wormway Sentinels', function () {
    function setup(context, challenge) {
        context.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: { inPlay: ['Wormway Sentinels'], gold: 0 },
            player2: { inPlay: ['House Maester', 'Bastard in Hiding'] }
        });
        context.maester = context.player2.findCardByName('House Maester', 'play area');
        context.bastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
        context.player2.clickPrompt(challenge);
        context.player2.clickCard(challenge === 'Military' ? context.bastard : context.maester);
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    it('can be declared as a defender in an intrigue challenge without an intrigue icon', function () {
        setup(this, 'Intrigue');

        expect(this.player1).toBeAbleToSelect(this.wormwaySentinels);
        this.player1.clickCard(this.wormwaySentinels);
        this.player1.clickPrompt('Done');

        expect(this.game.currentChallenge.isDefending(this.wormwaySentinels)).toBe(true);
    });

    it('can be declared as a defender in a power challenge without a power icon', function () {
        setup(this, 'Power');

        expect(this.player1).toBeAbleToSelect(this.wormwaySentinels);
    });

    it('can defend a military challenge using its own icon', function () {
        setup(this, 'Military');

        expect(this.player1).toBeAbleToSelect(this.wormwaySentinels);
    });
});

describe('Wormway Sentinels coming out of shadows this phase', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: { shadows: ['Wormway Sentinels'], gold: 5 },
            player2: { inPlay: ['House Maester'] }
        });
        this.attacker = this.player2.findCardByName('House Maester', 'play area');
        this.player2.clickPrompt('Intrigue');
        this.player2.clickCard(this.attacker);
        this.player2.clickPrompt('Done');
        this.player2.clickPrompt('Pass');
        this.player1.clickCard(this.wormwaySentinels);
    });

    it('can then be declared as a defender', function () {
        this.player2.clickPrompt('Pass');
        this.player1.clickPrompt('Pass');

        expect(this.player1).toBeAbleToSelect(this.wormwaySentinels);
    });
});
