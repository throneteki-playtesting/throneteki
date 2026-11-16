describe("Olenna's Stratagem", function () {
    function setup(context, { inPlay = [], gold = 2 } = {}) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                faction: 'tyrell',
                hand: ["Olenna's Stratagem"],
                inPlay: ['House Maester', ...inPlay],
                discard: ['Hedge Knight', 'Bodyguard', 'Tithe'],
                gold
            },
            player2: { inPlay: ['Tumblestone Knight'], discard: ['Winterfell Steward'] }
        });
        context.event = context.player1.findCardByName("Olenna's Stratagem", 'hand');
        context.hedgeKnight = context.player1.findCardByName('Hedge Knight', 'discard pile');
        context.bodyguard = context.player1.findCardByName('Bodyguard', 'discard pile');
        context.tithe = context.player1.findCardByName('Tithe', 'discard pile');
        context.opponentDiscard = context.player2.findCardByName(
            'Winterfell Steward',
            'discard pile'
        );
        context.player1.clickPrompt('Intrigue');
        context.player1.clickCard(context.houseMaester);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('after you win an intrigue challenge', function () {
        beforeEach(function () {
            setup(this);
            this.player1.triggerAbility(this.event);
        });

        it('can choose a non-event card in your discard pile', function () {
            expect(this.player1).toBeAbleToSelect(this.hedgeKnight);
            expect(this.player1).toBeAbleToSelect(this.bodyguard);
            expect(this.player1).not.toBeAbleToSelect(this.tithe);
            expect(this.player1).not.toBeAbleToSelect(this.opponentDiscard);
        });

        it('places it in shadows with shadow equal to its printed cost', function () {
            this.player1.clickCard(this.hedgeKnight);

            expect(this.hedgeKnight.location).toBe('shadows');
            expect(this.hedgeKnight.isShadow()).toBe(true);
            expect(this.bodyguard.location).toBe('discard pile');
            expect(this.event.location).toBe('discard pile');
        });
    });

    describe('with The Queen of Thorns in play', function () {
        beforeEach(function () {
            setup(this, { inPlay: ['The Queen of Thorns (TTWDFL)'], gold: 0 });
        });

        it('costs 2 less to play', function () {
            expect(this.player1).toAllowAbilityTrigger(this.event);
        });
    });

    describe('without The Queen of Thorns in play', function () {
        beforeEach(function () {
            setup(this, { gold: 1 });
        });

        it('cannot be played without enough gold', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.event);
        });
    });
});
