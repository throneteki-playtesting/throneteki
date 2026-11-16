describe('Praying for Loras', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                hand: ['Praying for Loras', 'Praying for Loras'],
                inPlay: ['Alla Tyrell (BtB)'],
                deadPile: [
                    'Margaery Tyrell (Core)',
                    'Ser Robar Royce (AHaH)',
                    'Courtesan of the Rose',
                    'Eddard Stark (Core)'
                ],
                gold: 2
            },
            player2: { deadPile: ['Margaery Tyrell (HoT)'] }
        });
        [this.event, this.secondEvent] = this.player1.filterCardsByName(
            'Praying for Loras',
            'hand'
        );
        this.nonKnight = this.player1.findCardByName('Margaery Tyrell', 'dead pile');
        this.knight = this.player1.findCardByName('Ser Robar Royce', 'dead pile');
        this.nonUnique = this.player1.findCardByName('Courtesan of the Rose', 'dead pile');
        this.otherFaction = this.player1.findCardByName('Eddard Stark', 'dead pile');
        this.opponentDead = this.player2.findCardByName('Margaery Tyrell', 'dead pile');
        this.player1.clickCard(this.event);
    });

    it('can only choose a unique Tyrell character in your dead pile', function () {
        expect(this.player1).toBeAbleToSelect(this.nonKnight);
        expect(this.player1).toBeAbleToSelect(this.knight);
        expect(this.player1).not.toBeAbleToSelect(this.nonUnique);
        expect(this.player1).not.toBeAbleToSelect(this.otherFaction);
        expect(this.player1).not.toBeAbleToSelect(this.opponentDead);
    });

    it('shuffles a character that is not a Knight into your deck', function () {
        this.player1.clickCard(this.nonKnight);

        expect(this.nonKnight.location).toBe('draw deck');
        expect(this.knight.location).toBe('dead pile');
        expect(this.event.location).toBe('discard pile');
        expect(this.player1).isReadyToTakeAction();
    });

    it('lets you shuffle a Knight into your deck', function () {
        this.player1.clickCard(this.knight);
        this.player1.clickPrompt('Shuffle into deck');

        expect(this.knight.location).toBe('draw deck');
    });

    it('lets you put a Knight into play knelt instead', function () {
        this.player1.clickCard(this.knight);
        this.player1.clickPrompt('Put into play knelt');

        expect(this.knight.location).toBe('play area');
        expect(this.knight.kneeled).toBe(true);
        expect(this.player1).isReadyToTakeAction();
    });

    it('can only be played once per round', function () {
        this.player1.clickCard(this.nonKnight);

        expect(this.player1.actionUnavailableReason(this.secondEvent)).toBe('limit');
    });
});

describe('Praying for Loras without a Lady character', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            player1: {
                hand: ['Praying for Loras'],
                inPlay: ['House Maester'],
                deadPile: ['Margaery Tyrell (Core)'],
                gold: 2
            },
            player2: {}
        });
    });

    it('cannot be played', function () {
        expect(this.player1.actionUnavailableReason(this.prayingForLoras)).toBe('condition');
    });
});
