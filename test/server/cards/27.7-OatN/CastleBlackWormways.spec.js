describe('Castle Black Wormways', function () {
    describe('when it comes out of shadows', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    shadows: ['Castle Black Wormways'],
                    inPlay: ['House Maester', 'The Roseroad'],
                    gold: 1
                },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
            this.maester = this.player1.findCardByName('House Maester', 'play area');
            this.roseroad = this.player1.findCardByName('The Roseroad', 'play area');
            this.opponentBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player1.clickCard(this.castleBlackWormways);
        });

        it('kneels to return a character you control to shadows', function () {
            expect(this.player1).toAllowAbilityTrigger(this.castleBlackWormways);
            this.player1.triggerAbility(this.castleBlackWormways);

            expect(this.player1).toBeAbleToSelect(this.maester);
            expect(this.player1).not.toBeAbleToSelect(this.roseroad);
            expect(this.player1).not.toBeAbleToSelect(this.opponentBastard);

            this.player1.clickCard(this.maester);

            expect(this.maester.location).toBe('shadows');
            expect(this.castleBlackWormways.kneeled).toBe(true);
            expect(this.opponentBastard.location).toBe('play area');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('reserve', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Castle Black Wormways'] },
                player2: {}
            });
        });

        it('gives its controller +1 reserve', function () {
            expect(this.player1Object.getReserve()).toBe(this.player2Object.getReserve() + 1);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
