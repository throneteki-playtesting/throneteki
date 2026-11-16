describe('Frey Tollkeeper', function () {
    function setup(context, { opponentGold }) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                hand: ['Frey Tollkeeper'],
                inPlay: ['House Maester', 'Bastard in Hiding'],
                gold: 5
            },
            player2: { inPlay: ['Tumblestone Knight'], gold: opponentGold }
        });
        context.tollkeeper = context.player1.findCardByName('Frey Tollkeeper', 'hand');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.attacker = context.player2.findCardByName('Tumblestone Knight', 'play area');
        context.player1.clickCard(context.tollkeeper);
        context.player1.triggerAbility(context.tollkeeper);
        context.player1.clickPrompt('Done');
        context.player2.clickPrompt('Military');
        context.player2.clickCard(context.attacker);
        context.player2.clickPrompt('Done');
    }

    describe('when the opponent has enough gold', function () {
        beforeEach(function () {
            setup(this, { opponentGold: 3 });
        });

        it('lets them move 2 gold to a card of your choice to be able to win', function () {
            expect(this.player2).toHavePromptButton('Move 2 gold');
            expect(this.player2).toHavePromptButton('Cannot win');

            this.player2.clickPrompt('Move 2 gold');
            this.player1.clickCard(this.maester);

            expect(this.maester.gold).toBe(2);
            expect(this.player2Object.gold).toBe(1);
        });

        it('stops them winning the challenge if they refuse', function () {
            this.player2.clickPrompt('Cannot win');

            expect(this.maester.gold).toBe(0);
            expect(this.player2Object.gold).toBe(3);
        });
    });

    describe('when the opponent cannot afford to move 2 gold', function () {
        beforeEach(function () {
            setup(this, { opponentGold: 1 });
        });

        it('stops them winning the challenge', function () {
            expect(this.player2).toHaveDisabledPromptButton('Move 2 gold');
            expect(this.player2).toHavePromptButton('Cannot win');

            this.player2.clickPrompt('Cannot win');

            expect(this.player2Object.gold).toBe(1);
        });
    });
});
