describe('Riverrun Besiegers', function () {
    function setup(context, { thirdChallenge = true, frey = false }) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    'Riverrun Besiegers',
                    frey ? 'Frey Tollkeeper' : 'Tumblestone Knight',
                    'Bastard in Hiding',
                    'House Maester'
                ]
            },
            player2: { inPlay: ['The Roseroad'] }
        });
        context.besiegers = context.riverrunBesiegers;
        context.partner = context.player1.findCardByName(
            frey ? 'Frey Tollkeeper' : 'Tumblestone Knight',
            'play area'
        );
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.roseroad = context.player2.findCardByName('The Roseroad', 'play area');

        context.player1.clickPrompt('Power');
        context.player1.clickCard(context.bastard);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();

        if (thirdChallenge) {
            context.player1.clickPrompt('Intrigue');
            context.player1.clickCard(context.maester);
            context.player1.clickPrompt('Done');
            context.skipActionWindow();
            context.player2.clickPrompt('Done');
            context.skipActionWindow();
        }

        context.player1.clickPrompt('Military');
        context.player1.clickCard(context.besiegers);
        context.player1.clickCard(context.partner);
        context.player1.clickPrompt('Done');
    }

    describe('when it kneels a location using assault in the third challenge you initiated', function () {
        beforeEach(function () {
            setup(this, {});
            this.player1.clickCard(this.roseroad);
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('discards the location', function () {
            expect(this.player1).toAllowAbilityTrigger(this.besiegers);
            this.player1.triggerAbility(this.besiegers);

            expect(this.roseroad.location).toBe('discard pile');
        });
    });

    describe('when you control 2 or more attacking House Frey characters', function () {
        beforeEach(function () {
            setup(this, { frey: true });
            this.player1.clickCard(this.roseroad);
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('takes control of the location instead', function () {
            this.player1.triggerAbility(this.besiegers);

            expect(this.roseroad.location).toBe('play area');
            expect(this.roseroad).toBeControlledBy(this.player1);
        });
    });

    describe('when it is not the third challenge you initiated', function () {
        beforeEach(function () {
            setup(this, { thirdChallenge: false });
            this.player1.clickCard(this.roseroad);
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.besiegers);
            expect(this.roseroad.location).toBe('play area');
        });
    });
});
