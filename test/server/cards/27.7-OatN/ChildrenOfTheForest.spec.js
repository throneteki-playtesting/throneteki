describe('Children of the Forest', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: ['Children of the Forest'],
                hand: ['Hedge Knight', 'House Maester', 'Tithe', 'Bodyguard'],
                discard: ['Winterfell Steward', 'The Roseroad']
            },
            player2: { discard: ['Lannisport Merchant'] }
        });
        this.hedgeKnight = this.player1.findCardByName('Hedge Knight', 'hand');
        this.maester = this.player1.findCardByName('House Maester', 'hand');
        this.tithe = this.player1.findCardByName('Tithe', 'hand');
        this.bodyguard = this.player1.findCardByName('Bodyguard', 'hand');
        this.steward = this.player1.findCardByName('Winterfell Steward', 'discard pile');
        this.roseroad = this.player1.findCardByName('The Roseroad', 'discard pile');
        this.merchant = this.player2.findCardByName('Lannisport Merchant', 'discard pile');
    });

    it('discards a non-event card to return another card of the same type from your discard pile', function () {
        this.player1.clickMenu(this.childrenOfTheForest, 'Return card from discard pile');

        expect(this.player1).toBeAbleToSelect(this.hedgeKnight);
        expect(this.player1).toBeAbleToSelect(this.maester);
        expect(this.player1).not.toBeAbleToSelect(this.tithe);
        expect(this.player1).not.toBeAbleToSelect(this.bodyguard);

        this.player1.clickCard(this.hedgeKnight);

        expect(this.player1).toBeAbleToSelect(this.steward);
        expect(this.player1).not.toBeAbleToSelect(this.roseroad);
        expect(this.player1).not.toBeAbleToSelect(this.merchant);

        this.player1.clickCard(this.steward);

        expect(this.steward.location).toBe('hand');
        expect(this.hedgeKnight.location).toBe('discard pile');
        expect(this.roseroad.location).toBe('discard pile');
        expect(this.player1).isReadyToTakeAction();
    });

    it('can only be used once per round', function () {
        this.player1.clickMenu(this.childrenOfTheForest, 'Return card from discard pile');
        this.player1.clickCard(this.hedgeKnight);
        this.player1.clickCard(this.steward);

        expect(this.player1.actionUnavailableReason(this.childrenOfTheForest)).toBe('limit');
    });
});

describe('Children of the Forest without a matching card in the discard pile', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: ['Children of the Forest'],
                hand: ['Hedge Knight'],
                discard: ['The Roseroad']
            },
            player2: {}
        });
    });

    it('cannot be used', function () {
        expect(this.player1.actionUnavailableReason(this.childrenOfTheForest)).toBe('cost');
    });
});
