describe('When Men See My Sails, They Pray', function () {
    function setup(context, { defend = false, copies = 1 } = {}) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                faction: 'greyjoy',
                gold: 4,
                hand: Array(copies).fill('When Men See My Sails, They Pray'),
                inPlay: ['House Maester'],
                drawDeck: [
                    "Black Wind's Crew",
                    "Silence's Crew (OatN)",
                    'Hedge Knight',
                    'Hedge Knight',
                    'Hedge Knight',
                    'Hedge Knight',
                    'Hedge Knight',
                    'Hedge Knight',
                    'Hedge Knight',
                    'Aeron Damphair (Core)',
                    "Euron Crow's Eye (Core)"
                ]
            },
            player2: { inPlay: ['House Maester'] }
        });
        [context.event, context.secondEvent] = context.player1.filterCardsByName(
            'When Men See My Sails, They Pray',
            'hand'
        );
        context.blackWind = context.player1.findCardByName("Black Wind's Crew", 'draw deck');
        context.silences = context.player1.findCardByName("Silence's Crew", 'draw deck');
        context.euron = context.player1.findCardByName("Euron Crow's Eye", 'draw deck');
        context.player1.clickPrompt('Intrigue');
        context.player1.clickCard(context.player1.findCardByName('House Maester', 'play area'));
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        if (defend) {
            context.player2.clickCard(context.player2.findCardByName('House Maester', 'play area'));
        }
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('after you win an unopposed challenge', function () {
        beforeEach(function () {
            setup(this);
        });

        it('searches the top 10 for a Greyjoy character with printed cost 6 or higher and puts it into play knelt', function () {
            expect(this.player1).toAllowAbilityTrigger(this.event);
            this.player1.triggerAbility(this.event);

            expect(this.player1).toBeAbleToSelect(this.silences);
            expect(this.player1).not.toBeAbleToSelect(this.blackWind);
            expect(this.player1).not.toBeAbleToSelect(this.euron);

            this.player1.clickCard(this.silences);

            expect(this.silences.location).toBe('play area');
            expect(this.silences.kneeled).toBe(true);
            expect(this.event.location).toBe('discard pile');
            expect(this.euron.location).toBe('draw deck');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('after you win an opposed challenge', function () {
        beforeEach(function () {
            setup(this, { defend: true });
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.event);
        });
    });
});
