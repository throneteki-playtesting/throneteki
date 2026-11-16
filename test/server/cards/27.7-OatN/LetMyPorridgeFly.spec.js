describe('Let My Porridge Fly', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: {
                plot: 'Let My Porridge Fly',
                hand: ['Hedge Knight', 'Winterfell Steward', 'Bodyguard']
            },
            player2: {
                hand: ['Lannisport Merchant', 'Hedge Knight', 'Eddard Stark (Core)']
            }
        });
        this.steward = this.player1.findCardByName('Winterfell Steward', 'hand');
        this.bodyguard = this.player1.findCardByName('Bodyguard', 'hand');
        this.ownKnight = this.player1.findCardByName('Hedge Knight', 'hand');
        this.merchant = this.player2.findCardByName('Lannisport Merchant', 'hand');
        this.opponentKnight = this.player2.findCardByName('Hedge Knight', 'hand');
        this.eddard = this.player2.findCardByName('Eddard Stark', 'hand');
    });

    it('discards each card with the lowest printed cost among both revealed hands', function () {
        this.completeMarshalPhase();
        this.player1.clickPrompt('Done');

        expect(this.steward.location).toBe('discard pile');
        expect(this.bodyguard.location).toBe('discard pile');
        expect(this.merchant.location).toBe('discard pile');
        expect(this.ownKnight.location).toBe('hand');
        expect(this.opponentKnight.location).toBe('hand');
        expect(this.eddard.location).toBe('hand');
        expect(this.player1).isReadyToTakeAction();
    });
});

describe('Let My Porridge Fly with empty hands', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: { plot: 'Let My Porridge Fly', hand: [] },
            player2: { hand: [] }
        });
    });

    it('discards nothing', function () {
        this.completeMarshalPhase();

        expect(this.player1Object.discardPile.length).toBe(0);
        expect(this.player2Object.discardPile.length).toBe(0);
        expect(this.player1).isReadyToTakeAction();
    });
});
