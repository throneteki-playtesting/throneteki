describe("The Merman's Shield", function () {
    describe('when it comes out of shadows outside a challenge', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    shadows: ["The Merman's Shield"],
                    inPlay: [
                        { card: 'Sunspear Sentinel', kneeling: true },
                        { card: 'Bastard in Hiding', kneeling: true },
                        { card: 'Wormway Sentinels', kneeling: true }
                    ],
                    gold: 4
                },
                player2: { inPlay: [{ card: 'Sunspear Sentinel', kneeling: true }] }
            });
            this.sentinel = this.player1.findCardByName('Sunspear Sentinel', 'play area');
            this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.wormway = this.player1.findCardByName('Wormway Sentinels', 'play area');
            this.opponentSentinel = this.player2.findCardByName('Sunspear Sentinel', 'play area');
            this.player1.clickCard(this.theMermansShield);
        });

        it('stands a character that shares a trait with it', function () {
            expect(this.player1).toAllowAbilityTrigger(this.theMermansShield);
            this.player1.triggerAbility(this.theMermansShield);

            expect(this.player1).toBeAbleToSelect(this.sentinel);
            expect(this.player1).toBeAbleToSelect(this.wormway);
            expect(this.player1).toBeAbleToSelect(this.opponentSentinel);
            expect(this.player1).not.toBeAbleToSelect(this.bastard);
            expect(this.player1).not.toBeAbleToSelect(this.theMermansShield);

            this.player1.clickCard(this.sentinel);

            expect(this.sentinel.kneeled).toBe(false);
            expect(this.sentinel.hasKeyword('renown')).toBe(false);
            expect(this.wormway.kneeled).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when the chosen character is defending', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    shadows: ["The Merman's Shield"],
                    inPlay: ['Sunspear Sentinel'],
                    gold: 4
                },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
            this.sentinel = this.sunspearSentinel;
            this.attacker = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player2.clickPrompt('Military');
            this.player2.clickCard(this.attacker);
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickCard(this.sentinel);
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Pass');
            this.player1.clickCard(this.theMermansShield);
        });

        it('stands it and gives it renown until the end of the phase', function () {
            this.player1.triggerAbility(this.theMermansShield);
            expect(this.sentinel.kneeled).toBe(true);

            this.player1.clickCard(this.sentinel);

            expect(this.sentinel.kneeled).toBe(false);
            expect(this.sentinel.hasKeyword('renown')).toBe(true);
        });
    });
});
