describe('Knight of the Seven', function () {
    function setup(context, handSize) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: ['Knight of the Seven', 'Bastard in Hiding'],
                hand: Array(handSize).fill('Hedge Knight')
            },
            player2: { inPlay: ['Tumblestone Knight'] }
        });
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
    }

    describe('STR', function () {
        beforeEach(function () {
            setup(this, 3);
        });

        it('gets +1 STR for each card in its controller hand, and not the opponent', function () {
            expect(this.knightOfTheSeven.getStrength()).toBe(4);
            expect(this.bastard.getStrength()).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when it has 7 or more STR after winning a challenge', function () {
        beforeEach(function () {
            setup(this, 6);
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.knightOfTheSeven);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('stands it', function () {
            expect(this.knightOfTheSeven.kneeled).toBe(true);
            expect(this.player1).toAllowAbilityTrigger(this.knightOfTheSeven);

            this.player1.triggerAbility(this.knightOfTheSeven);
            this.player2.clickCard(this.tumblestoneKnight);

            expect(this.knightOfTheSeven.kneeled).toBe(false);
            expect(this.tumblestoneKnight.location).toBe('dead pile');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when it has less than 7 STR after winning a challenge', function () {
        beforeEach(function () {
            setup(this, 5);
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.knightOfTheSeven);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickCard(this.tumblestoneKnight);
        });

        it('is not offered', function () {
            expect(this.knightOfTheSeven.getStrength()).toBe(6);
            expect(this.player1).not.toAllowAbilityTrigger(this.knightOfTheSeven);
            expect(this.knightOfTheSeven.kneeled).toBe(true);
        });
    });

    describe('when it is not participating in the challenge that was won', function () {
        beforeEach(function () {
            setup(this, 6);
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickCard(this.tumblestoneKnight);
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.knightOfTheSeven);
        });
    });
});
