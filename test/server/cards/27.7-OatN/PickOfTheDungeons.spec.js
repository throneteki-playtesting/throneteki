describe('Pick of the Dungeons', function () {
    describe('during the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    faction: 'thenightswatch',
                    hand: ['Pick of the Dungeons'],
                    discard: ['Hedge Knight'],
                    gold: 5
                },
                player2: {
                    discard: [
                        'Hedge Knight',
                        'Winterfell Steward',
                        'Eddard Stark (Core)',
                        'Bodyguard'
                    ]
                }
            });
            this.pick = this.player1.findCardByName('Pick of the Dungeons', 'hand');
            this.ownKnight = this.player1.findCardByName('Hedge Knight', 'discard pile');
            this.opponentKnight = this.player2.findCardByName('Hedge Knight', 'discard pile');
            this.steward = this.player2.findCardByName('Winterfell Steward', 'discard pile');
            this.eddard = this.player2.findCardByName('Eddard Stark', 'discard pile');
            this.bodyguard = this.player2.findCardByName('Bodyguard', 'discard pile');
        });

        it('can only choose an opponent character with a printed cost of 4 or lower', function () {
            this.player1.clickCard(this.pick);

            expect(this.player1).toBeAbleToSelect(this.opponentKnight);
            expect(this.player1).toBeAbleToSelect(this.steward);
            expect(this.player1).not.toBeAbleToSelect(this.ownKnight);
            expect(this.player1).not.toBeAbleToSelect(this.eddard);
            expect(this.player1).not.toBeAbleToSelect(this.bodyguard);
        });

        it('puts the character into play under your control and places it on the bottom of its owner deck at the end of the phase', function () {
            this.player1.clickCard(this.pick);
            this.player1.clickCard(this.steward);

            expect(this.steward.location).toBe('play area');
            expect(this.steward).toBeControlledBy(this.player1);
            expect(this.pick.location).toBe('discard pile');
            expect(this.player1).isReadyToTakeAction();

            this.completeChallengesPhase();

            expect(this.steward.location).toBe('draw deck');
            expect(this.player2Object.drawDeck[this.player2Object.drawDeck.length - 1]).toBe(
                this.steward
            );
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { hand: ['Pick of the Dungeons'], gold: 5 },
                player2: { discard: ['Winterfell Steward'] }
            });
        });

        it('cannot be played', function () {
            expect(this.player1.actionUnavailableReason(this.pickOfTheDungeons)).toBe('phase');
        });
    });
});
