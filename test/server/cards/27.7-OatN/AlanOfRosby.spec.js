describe('Alan of Rosby', function () {
    describe('when it comes out of shadows during a challenge', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    shadows: ['Alan of Rosby'],
                    inPlay: ['Samwell Tarly (Core)', 'Bastard in Hiding'],
                    gold: 1
                },
                player2: { inPlay: ['House Maester'] }
            });
            this.sam = this.player1.findCardByName('Samwell Tarly', 'play area');
            this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.opponentMaester = this.player2.findCardByName('House Maester', 'play area');

            this.player2.clickPrompt('Intrigue');
            this.player2.clickCard(this.opponentMaester);
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickCard(this.sam);
            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Pass');
            this.player1.clickCard(this.alanOfRosby);
        });

        it('can only stand a defending Night Watch character you control', function () {
            expect(this.player1).toAllowAbilityTrigger(this.alanOfRosby);
            this.player1.triggerAbility(this.alanOfRosby);

            expect(this.player1).toBeAbleToSelect(this.sam);
            expect(this.player1).not.toBeAbleToSelect(this.bastard);
            expect(this.player1).not.toBeAbleToSelect(this.alanOfRosby);
            expect(this.player1).not.toBeAbleToSelect(this.opponentMaester);
        });

        it('stands the chosen defender', function () {
            this.player1.triggerAbility(this.alanOfRosby);
            expect(this.sam.kneeled).toBe(true);

            this.player1.clickCard(this.sam);

            expect(this.sam.kneeled).toBe(false);
            expect(this.alanOfRosby.location).toBe('play area');
        });
    });

    describe('when it comes out of shadows outside a challenge', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    shadows: ['Alan of Rosby'],
                    inPlay: ['Samwell Tarly (Core)'],
                    gold: 1
                },
                player2: {}
            });
            this.player1.clickCard(this.alanOfRosby);
        });

        it('is not offered', function () {
            expect(this.alanOfRosby.location).toBe('play area');
            expect(this.player1).not.toAllowAbilityTrigger(this.alanOfRosby);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
