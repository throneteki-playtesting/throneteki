describe('Brightwater Commander', function () {
    function setup(context) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: ['Brightwater Commander', 'Bastard in Hiding'],
                hand: ['Hedge Knight', 'Bodyguard', 'Tithe']
            },
            player2: { inPlay: ['Tumblestone Knight'] }
        });
        context.hedgeKnight = context.player1.findCardByName('Hedge Knight', 'hand');
        context.bodyguard = context.player1.findCardByName('Bodyguard', 'hand');
        context.tithe = context.player1.findCardByName('Tithe', 'hand');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.knight = context.player2.findCardByName('Tumblestone Knight', 'play area');
    }

    function winMilitary(context, attacker) {
        context.player1.clickPrompt('Military');
        context.player1.clickCard(attacker);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('when it wins as an attacker', function () {
        beforeEach(function () {
            setup(this);
            winMilitary(this, this.brightwaterCommander);
        });

        it('reveals a card from hand and places it in shadows', function () {
            expect(this.player1).toAllowAbilityTrigger(this.brightwaterCommander);
            this.player1.triggerAbility(this.brightwaterCommander);

            expect(this.player1).toBeAbleToSelect(this.hedgeKnight);
            expect(this.player1).toBeAbleToSelect(this.tithe);
            expect(this.player1).not.toBeAbleToSelect(this.bastard);

            this.player1.clickCard(this.bodyguard);
            this.player2.clickCard(this.knight);

            expect(this.bodyguard.location).toBe('shadows');
            expect(this.hedgeKnight.location).toBe('hand');
            expect(this.tithe.location).toBe('hand');
        });
    });

    describe('when another character is the one attacking', function () {
        beforeEach(function () {
            setup(this);
            winMilitary(this, this.bastard);
            this.player2.clickCard(this.knight);
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.brightwaterCommander);
        });
    });
});
