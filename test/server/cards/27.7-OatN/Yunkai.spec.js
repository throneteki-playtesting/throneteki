describe('Yunkai', function () {
    function setup(context) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                faction: 'targaryen',
                hand: ['Hedge Knight', 'Bodyguard'],
                inPlay: [
                    'Yunkai (OatN)',
                    'Bastard in Hiding',
                    'Tumblestone Knight',
                    'House Maester'
                ]
            },
            player2: { inPlay: ['Bastard in Hiding'] }
        });
        context.hedgeKnight = context.player1.findCardByName('Hedge Knight', 'hand');
        context.bodyguard = context.player1.findCardByName('Bodyguard', 'hand');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.opponentBastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
        context.player1.clickPrompt('Military');
        context.player1.clickCard(context.bastard);
        context.player1.clickCard(context.knight);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickCard(context.opponentBastard);
        context.player2.clickPrompt('Done');
    }

    describe('when the action is used', function () {
        beforeEach(function () {
            setup(this);
            this.handBefore = this.player1Object.hand.length;
            this.player1.clickMenu(this.yunkai, 'Give up to 2 participating characters -1 STR');
            this.player1.clickCard(this.hedgeKnight);
        });

        it('can choose up to 2 participating characters', function () {
            expect(this.player1).toBeAbleToSelect(this.bastard);
            expect(this.player1).toBeAbleToSelect(this.knight);
            expect(this.player1).toBeAbleToSelect(this.opponentBastard);
            expect(this.player1).not.toBeAbleToSelect(this.maester);
            expect(this.player1).not.toBeAbleToSelect(this.yunkai);
        });

        it('kneels Yunkai, discards the card and gives each target -1 STR', function () {
            this.player1.clickCard(this.knight);
            this.player1.clickCard(this.opponentBastard);
            this.player1.clickPrompt('Done');

            expect(this.yunkai.kneeled).toBe(true);
            expect(this.hedgeKnight.location).toBe('discard pile');
            expect(this.knight.getStrength()).toBe(1);
            expect(this.opponentBastard.getStrength()).toBe(1);
            expect(this.bastard.getStrength()).toBe(2);
            expect(this.player1Object.hand.length).toBe(this.handBefore - 1);
        });

        it('draws a card when a targeted character is killed this phase', function () {
            this.player1.clickCard(this.opponentBastard);
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Pass');
            this.player1.clickPrompt('Pass');
            this.player2.clickCard(this.opponentBastard);

            expect(this.opponentBastard.location).toBe('dead pile');
            expect(this.player1Object.hand.length).toBe(this.handBefore - 1 + 1);
        });
    });
});
