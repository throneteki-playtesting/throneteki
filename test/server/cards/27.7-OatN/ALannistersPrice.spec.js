describe("A Lannister's Price", function () {
    const unopposedBonus = 1;

    function setup(
        context,
        { count, name = 'House Maester', challengeType = 'Intrigue', opponentGold = 2 }
    ) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                faction: 'lannister',
                hand: ["A Lannister's Price"],
                inPlay: Array(count).fill(name)
            },
            player2: { gold: opponentGold, inPlay: ['Tumblestone Knight'] }
        });
        context.price = context.player1.findCardByName("A Lannister's Price", 'hand');
        context.attackers = context.player1.filterCardsByName(name, 'play area');
        context.player1.clickPrompt(challengeType);
        context.player1.clickCard(context.attackers[0]);
        for (const attacker of context.attackers.slice(1)) {
            context.player1.clickCard(attacker);
        }
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('when the challenge is won by 5 or more STR', function () {
        beforeEach(function () {
            setup(this, { count: 3 });
        });

        it('is offered to the winner', function () {
            expect(this.player1).toAllowAbilityTrigger(this.price);
        });

        it('gains 2 power when the loser allows it', function () {
            const powerBefore = this.player1Object.faction.power;
            this.player1.triggerAbility(this.price);
            this.player2.clickPrompt('Allow event');

            expect(this.player1Object.faction.power).toBe(powerBefore + 2 + unopposedBonus);
            expect(this.player2Object.gold).toBe(2);
            expect(this.price.location).toBe('discard pile');
            expect(this.player1).isReadyToTakeAction();
        });

        it('cancels the power gain when the loser gives 2 gold', function () {
            const powerBefore = this.player1Object.faction.power;
            const goldBefore = this.player1Object.gold;
            this.player1.triggerAbility(this.price);
            this.player2.clickPrompt('Give 2 gold');

            expect(this.player1Object.faction.power).toBe(powerBefore + unopposedBonus);
            expect(this.player1Object.gold).toBe(goldBefore + 2);
            expect(this.player2Object.gold).toBe(0);
            expect(this.price.location).toBe('discard pile');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when the loser has fewer than 2 gold', function () {
        beforeEach(function () {
            setup(this, { count: 3, opponentGold: 1 });
        });

        it('gains the power without giving the loser a choice', function () {
            const powerBefore = this.player1Object.faction.power;
            this.player1.triggerAbility(this.price);

            expect(this.player1Object.faction.power).toBe(powerBefore + 2 + unopposedBonus);
            expect(this.player2Object.gold).toBe(1);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when the challenge is won by less than 5 STR', function () {
        beforeEach(function () {
            setup(this, { count: 2 });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.price);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when the challenge is not an intrigue challenge', function () {
        beforeEach(function () {
            setup(this, { count: 3, name: 'Bastard in Hiding', challengeType: 'Military' });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.price);
        });
    });
});
