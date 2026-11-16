describe("Euron Crow's Eye", function () {
    function setup(context, phase = 'challenge') {
        context.setupTest({
            phase,
            player1: {
                shadows: ['Alan of Rosby'],
                inPlay: [
                    "Euron Crow's Eye (OatN)",
                    'Bastard in Hiding',
                    'The Roseroad',
                    { card: 'The Iron Throne (Core)', kneeling: true }
                ],
                gold: 1
            },
            player2: { inPlay: [{ card: "Tobho Mott's Armory" }, 'Bastard in Hiding'] }
        });
        context.roseroad = context.player1.findCardByName('The Roseroad', 'play area');
        context.throne = context.player1.findCardByName('The Iron Throne', 'play area');
        context.armory = context.player2.findCardByName("Tobho Mott's Armory", 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.opponentBastard = context.player2.findCardByName('Bastard in Hiding', 'play area');
    }

    function bringOutAlan(context) {
        context.player1.clickPrompt('Military');
        context.player1.clickCard(context.bastard);
        context.player1.clickPrompt('Done');
        context.player1.clickCard(context.alanOfRosby);
    }

    describe('when a card comes out of shadows during the challenges phase', function () {
        beforeEach(function () {
            setup(this);
            bringOutAlan(this);
        });

        it('can choose any location', function () {
            expect(this.player1).toAllowAbilityTrigger(this.euronCrowsEye);
            this.player1.triggerAbility(this.euronCrowsEye);

            expect(this.player1).toBeAbleToSelect(this.roseroad);
            expect(this.player1).toBeAbleToSelect(this.throne);
            expect(this.player1).toBeAbleToSelect(this.armory);
            expect(this.player1).not.toBeAbleToSelect(this.bastard);
            expect(this.player1).not.toBeAbleToSelect(this.opponentBastard);
        });

        it('kneels a location whose printed cost is not greater than your initiative', function () {
            this.player1.triggerAbility(this.euronCrowsEye);
            this.player1.clickCard(this.roseroad);

            expect(this.roseroad.kneeled).toBe(true);
            expect(this.player1).not.toHavePromptButton('Stand');
        });

        it('lets you stand a location whose printed cost is greater than your initiative', function () {
            this.player1.triggerAbility(this.euronCrowsEye);
            this.player1.clickCard(this.throne);

            expect(this.player1).toHaveDisabledPromptButton('Kneel');
            expect(this.player1).toHavePromptButton('Stand');

            this.player1.clickPrompt('Stand');

            expect(this.throne.kneeled).toBe(false);
        });

        it('lets you kneel a location whose printed cost is greater than your initiative', function () {
            this.player1.triggerAbility(this.euronCrowsEye);
            this.player1.clickCard(this.armory);
            this.player1.clickPrompt('Kneel');

            expect(this.armory.kneeled).toBe(true);
            expect(this.roseroad.kneeled).toBe(false);
        });
    });

    describe('when a card comes out of shadows outside the challenges phase', function () {
        beforeEach(function () {
            setup(this, 'marshal');
            this.player1.clickCard(this.alanOfRosby);
        });

        it('is not offered', function () {
            expect(this.alanOfRosby.location).toBe('play area');
            expect(this.player1).not.toAllowAbilityTrigger(this.euronCrowsEye);
        });
    });
});
