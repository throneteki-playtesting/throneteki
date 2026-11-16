describe('The Weeping Water', function () {
    function setup(context, { kneeling = false } = {}) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    { card: 'The Weeping Water', kneeling },
                    'Wildling Scout',
                    'House Maester',
                    'Bastard in Hiding'
                ]
            },
            player2: { inPlay: ['Wildling Scout'] }
        });
        context.scout = context.player1.findCardByName('Wildling Scout', 'play area');
        context.opponentScout = context.player2.findCardByName('Wildling Scout', 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
    }

    describe('when a character is sacrificed', function () {
        beforeEach(function () {
            setup(this);
            this.player1.clickMenu(this.scout, 'Give another character stealth');
        });

        it('kneels to place it in its owner dead pile instead of the discard pile', function () {
            expect(this.player1).toAllowAbilityTrigger(this.theWeepingWater);
            this.player1.triggerAbility(this.theWeepingWater);
            this.player1.clickCard(this.maester);

            expect(this.theWeepingWater.kneeled).toBe(true);
            expect(this.scout.location).toBe('dead pile');
            expect(this.player1Object.discardPile).not.toContain(this.scout);
            expect(this.player1).isReadyToTakeAction();
        });

        it('lets the sacrifice go to the discard pile if declined', function () {
            this.player1.clickPrompt('Pass');
            this.player1.clickCard(this.maester);

            expect(this.scout.location).toBe('discard pile');
            expect(this.theWeepingWater.kneeled).toBe(false);
        });
    });

    describe('when The Weeping Water is already kneeling', function () {
        beforeEach(function () {
            setup(this, { kneeling: true });
            this.player1.clickMenu(this.scout, 'Give another character stealth');
            this.player1.clickCard(this.maester);
        });

        it('is not offered', function () {
            expect(this.scout.location).toBe('discard pile');
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
