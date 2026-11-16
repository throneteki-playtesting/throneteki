describe('A Necessary Sacrifice', function () {
    function setup(context) {
        context.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: {
                hand: ['A Necessary Sacrifice'],
                inPlay: ['Bastard in Hiding', 'House Maester', 'Tumblestone Knight']
            },
            player2: { inPlay: ['Bastard in Hiding', 'House Dayne Knight'] }
        });
        context.event = context.player1.findCardByName('A Necessary Sacrifice', 'hand');
        context.nonStark = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.stark = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.opponentBastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
        context.opponentKnight = context.player2.findCardByName('House Dayne Knight', 'play area');
        context.player2.clickPrompt('Military');
        context.player2.clickCard(context.opponentBastard);
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('when a non-Stark character would be killed', function () {
        beforeEach(function () {
            setup(this);
            this.player1.clickCard(this.nonStark);
        });

        it('saves it and sacrifices another character', function () {
            expect(this.player1).toAllowAbilityTrigger(this.event);
            this.player1.triggerAbility(this.event);

            expect(this.player1).toBeAbleToSelect(this.maester);
            expect(this.player1).toBeAbleToSelect(this.stark);
            expect(this.player1).not.toBeAbleToSelect(this.nonStark);
            expect(this.player1).not.toBeAbleToSelect(this.opponentBastard);

            this.player1.clickCard(this.maester);

            expect(this.nonStark.location).toBe('play area');
            expect(this.maester.location).toBe('discard pile');
            expect(this.stark.location).toBe('play area');
            expect(this.event.location).toBe('discard pile');
            expect(this.player2).isReadyToTakeAction();
        });

        it('allows the player to decline', function () {
            this.player1.clickPrompt('Pass');

            expect(this.nonStark.location).toBe('dead pile');
            expect(this.event.location).toBe('hand');
        });
    });

    describe('when a Stark character would be killed', function () {
        beforeEach(function () {
            setup(this);
            this.player1.clickCard(this.stark);
        });

        it('is not offered', function () {
            expect(this.stark.location).toBe('dead pile');
            expect(this.event.location).toBe('hand');
            expect(this.player2).isReadyToTakeAction();
        });
    });
});
