describe('Vengeance for Elia', function () {
    function setup(context, { killed }) {
        context.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: {
                hand: ['Vengeance for Elia (OatN)'],
                inPlay: [
                    'House Dayne Knight',
                    'Tumblestone Knight',
                    { card: 'Bastard in Hiding', kneeling: true },
                    { card: 'Bastard in Hiding', kneeling: true },
                    { card: 'House Maester', kneeling: true }
                ],
                gold: 2
            },
            player2: {
                inPlay: [{ card: 'Bastard in Hiding', kneeling: true }, 'Bastard in Hiding']
            }
        });
        context.event = context.player1.findCardByName('Vengeance for Elia', 'hand');
        context.martell = context.player1.findCardByName('House Dayne Knight', 'play area');
        context.stark = context.player1.findCardByName('Tumblestone Knight', 'play area');
        [context.bastard1, context.bastard2] = context.player1.filterCardsByName(
            'Bastard in Hiding',
            'play area'
        );
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.opponentBastard = context.player2.filterCardsByName(
            'Bastard in Hiding',
            'play area'
        )[0];
        context.attacker = context.player2.filterCardsByName('Bastard in Hiding', 'play area')[1];
        context.player2.clickPrompt('Military');
        context.player2.clickCard(context.attacker);
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player1.clickCard(context[killed]);
    }

    describe('when a Martell character you control is killed', function () {
        beforeEach(function () {
            setup(this, { killed: 'martell' });
        });

        it('stands any number of Bastard characters you control', function () {
            expect(this.player1).toAllowAbilityTrigger(this.event);
            this.player1.triggerAbility(this.event);

            expect(this.player1).toBeAbleToSelect(this.bastard1);
            expect(this.player1).toBeAbleToSelect(this.bastard2);
            expect(this.player1).not.toBeAbleToSelect(this.maester);
            expect(this.player1).not.toBeAbleToSelect(this.stark);
            expect(this.player1).not.toBeAbleToSelect(this.opponentBastard);

            this.player1.clickCard(this.bastard1);
            this.player1.clickPrompt('Done');

            expect(this.bastard1.kneeled).toBe(false);
            expect(this.bastard2.kneeled).toBe(true);
            expect(this.opponentBastard.kneeled).toBe(true);
            expect(this.event.location).toBe('discard pile');
        });

        it('can stand every Bastard', function () {
            this.player1.triggerAbility(this.event);
            this.player1.clickCard(this.bastard1);
            this.player1.clickCard(this.bastard2);
            this.player1.clickPrompt('Done');

            expect(this.bastard1.kneeled).toBe(false);
            expect(this.bastard2.kneeled).toBe(false);
        });
    });

    describe('when a non-Martell character you control is killed', function () {
        beforeEach(function () {
            setup(this, { killed: 'stark' });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.event);
            expect(this.stark.location).toBe('dead pile');
        });
    });
});
