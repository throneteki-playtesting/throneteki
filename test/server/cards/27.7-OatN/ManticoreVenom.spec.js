describe('Manticore Venom', function () {
    describe('attached to an opponent character', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Bastard in Hiding'] },
                player2: {
                    inPlay: [
                        {
                            card: 'Bastard in Hiding',
                            attachments: [{ card: 'Manticore Venom', owner: 'player1' }]
                        },
                        'House Dayne Knight'
                    ]
                }
            });
            this.ownBastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.venomedBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.opponentKnight = this.player2.findCardByName('House Dayne Knight', 'play area');
        });

        it('removes a military, an intrigue and a power icon from the attached character only', function () {
            expect(this.venomedBastard.hasIcon('military')).toBe(false);
            expect(this.venomedBastard.hasIcon('intrigue')).toBe(false);
            expect(this.venomedBastard.hasIcon('power')).toBe(false);
            expect(this.ownBastard.hasIcon('military')).toBe(true);
            expect(this.ownBastard.hasIcon('power')).toBe(true);
            expect(this.opponentKnight.hasIcon('military')).toBe(true);
            expect(this.opponentKnight.hasIcon('intrigue')).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('attachment restriction', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    hand: ['Manticore Venom'],
                    inPlay: ['Bastard in Hiding'],
                    gold: 5
                },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
            this.ownBastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.opponentBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player1.clickCard(this.manticoreVenom);
            this.player1.clickPrompt('Marshal');
        });

        it('can only be attached to an opponent character', function () {
            expect(this.player1).toBeAbleToSelect(this.opponentBastard);
            expect(this.player1).not.toBeAbleToSelect(this.ownBastard);
        });
    });
});
