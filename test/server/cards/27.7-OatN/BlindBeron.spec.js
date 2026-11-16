describe('Blind Beron', function () {
    function setup(context, attackers) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    'Blind Beron',
                    'Winterfell Steward',
                    'Bastard in Hiding',
                    'Tumblestone Knight'
                ],
                deadPile: ['Aeron Damphair (Core)', 'Drowned Men (Core)', 'Robb Stark (Core)']
            },
            player2: { deadPile: ['Aeron Damphair (Core)'], inPlay: ['House Maester'] }
        });
        context.steward = context.player1.findCardByName('Winterfell Steward', 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.aeron = context.player1.findCardByName('Aeron Damphair', 'dead pile');
        context.drownedMen = context.player1.findCardByName('Drowned Men', 'dead pile');
        context.robb = context.player1.findCardByName('Robb Stark', 'dead pile');
        context.opponentAeron = context.player2.findCardByName('Aeron Damphair', 'dead pile');
        context.player1.clickPrompt('Power');
        for (const attacker of attackers(context)) {
            context.player1.clickCard(attacker);
        }
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('when you win by exactly 5 STR with Blind Beron participating', function () {
        beforeEach(function () {
            setup(this, (context) => [context.blindBeron, context.steward]);
        });

        it('kills him to put another Drowned God character from your dead pile into play', function () {
            expect(this.player1).toAllowAbilityTrigger(this.blindBeron);
            this.player1.triggerAbility(this.blindBeron);

            expect(this.player1).toBeAbleToSelect(this.aeron);
            expect(this.player1).toBeAbleToSelect(this.drownedMen);
            expect(this.player1).not.toBeAbleToSelect(this.robb);
            expect(this.player1).not.toBeAbleToSelect(this.opponentAeron);

            this.player1.clickCard(this.aeron);

            expect(this.blindBeron.location).toBe('dead pile');
            expect(this.aeron.location).toBe('play area');
            expect(this.drownedMen.location).toBe('dead pile');
            expect(this.robb.location).toBe('dead pile');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when you win by less than 5 STR', function () {
        beforeEach(function () {
            setup(this, (context) => [context.blindBeron]);
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.blindBeron);
        });
    });

    describe('when Blind Beron is not participating', function () {
        beforeEach(function () {
            setup(this, (context) => [context.steward, context.bastard, context.knight]);
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.blindBeron);
        });
    });
});
