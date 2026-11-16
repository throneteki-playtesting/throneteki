describe('Clegane Brigand', function () {
    function setup(context) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: ['Clegane Brigand'],
                discard: ['Winterfell Steward']
            },
            player2: {
                inPlay: ['Tumblestone Knight'],
                drawDeck: ['Hedge Knight'],
                discard: ['Lannisport Merchant']
            }
        });
        context.ownDiscard = context.player1.findCardByName('Winterfell Steward', 'discard pile');
        context.merchant = context.player2.findCardByName('Lannisport Merchant', 'discard pile');
        context.hedgeKnight = context.player2.findCardByName('Hedge Knight', 'draw deck');
        context.knight = context.player2.findCardByName('Tumblestone Knight', 'play area');
        context.player1.clickPrompt('Military');
        context.player1.clickCard(context.cleganeBrigand);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickCard(context.knight);
    }

    describe('after it discards a card using pillage', function () {
        beforeEach(function () {
            setup(this);
        });

        it('places a card from the losing opponent discard pile on top of their deck', function () {
            expect(this.player1).toAllowAbilityTrigger(this.cleganeBrigand);
            this.player1.triggerAbility(this.cleganeBrigand);

            expect(this.player1).toBeAbleToSelect(this.hedgeKnight);
            expect(this.player1).toBeAbleToSelect(this.merchant);
            expect(this.player1).not.toBeAbleToSelect(this.ownDiscard);

            this.player1.clickCard(this.merchant);

            expect(this.merchant.location).toBe('draw deck');
            expect(this.player2Object.drawDeck[0]).toBe(this.merchant);
            expect(this.hedgeKnight.location).toBe('discard pile');
            expect(this.ownDiscard.location).toBe('discard pile');
        });
    });
});

describe('Clegane Brigand when it does not win', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: { inPlay: ['Clegane Brigand'] },
            player2: { inPlay: ['Tumblestone Knight', 'Bastard in Hiding'] }
        });
        this.player1.clickPrompt('Military');
        this.player1.clickCard(this.cleganeBrigand);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
        this.player2.clickCard(this.tumblestoneKnight);
        this.player2.clickCard(this.bastardInHiding);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
    });

    it('does not pillage', function () {
        expect(this.player1).not.toAllowAbilityTrigger(this.cleganeBrigand);
        expect(this.player2Object.discardPile.length).toBe(0);
    });
});
