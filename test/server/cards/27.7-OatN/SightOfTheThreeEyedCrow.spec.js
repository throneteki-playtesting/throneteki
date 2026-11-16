describe('Sight of the Three-Eyed Crow', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: {
                agenda: 'Sight of the Three-Eyed Crow',
                hand: ['Hedge Knight', 'House Maester'],
                gold: 10,
                drawDeck: [
                    'Winterfell Steward',
                    'Eddard Stark (Core)',
                    'The Roseroad',
                    'Lannisport Merchant',
                    'Bodyguard'
                ]
            },
            player2: {}
        });
        this.hedgeKnight = this.player1.findCardByName('Hedge Knight', 'hand');
        this.maester = this.player1.findCardByName('House Maester', 'hand');
        this.steward = this.player1.findCardByName('Winterfell Steward', 'draw deck');
        this.eddard = this.player1.findCardByName('Eddard Stark', 'draw deck');
        this.roseroad = this.player1.findCardByName('The Roseroad', 'draw deck');
        this.merchant = this.player1.findCardByName('Lannisport Merchant', 'draw deck');
        this.bodyguard = this.player1.findCardByName('Bodyguard', 'draw deck');
        this.player1.clickCard(this.hedgeKnight);
    });

    it('searches for a card of the same type with equal or lower printed cost', function () {
        expect(this.player1).toAllowAbilityTrigger(this.sightOfTheThreeEyedCrow);
        this.player1.triggerAbility(this.sightOfTheThreeEyedCrow);

        expect(this.player1).toBeAbleToSelect(this.steward);
        expect(this.player1).toBeAbleToSelect(this.merchant);
        expect(this.player1).not.toBeAbleToSelect(this.eddard);
        expect(this.player1).not.toBeAbleToSelect(this.roseroad);
        expect(this.player1).not.toBeAbleToSelect(this.bodyguard);

        this.player1.clickCard(this.steward);

        expect(this.steward.location).toBe('hand');
        expect(this.player1).isReadyToTakeAction();
    });

    it('can only be used once per round', function () {
        this.player1.triggerAbility(this.sightOfTheThreeEyedCrow);
        this.player1.clickCard(this.steward);
        this.player1.clickCard(this.maester);

        expect(this.player1).not.toAllowAbilityTrigger(this.sightOfTheThreeEyedCrow);
    });
});
