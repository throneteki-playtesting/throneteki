describe('Battle of the Bells', function () {
    describe('while it is revealed', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    plot: 'Battle of the Bells',
                    hand: ['Vanguard Lancer'],
                    gold: 5
                },
                player2: {
                    hand: ['Vanguard Lancer'],
                    inPlay: ['Bastard in Hiding'],
                    gold: 5
                }
            });
            this.lancer = this.player1.findCardByName('Vanguard Lancer', 'hand');
        });

        it('prevents entering play reactions from being triggered by the plot controller', function () {
            this.player1.clickCard(this.lancer);

            expect(this.lancer.location).toBe('play area');
            expect(this.player1).not.toAllowAbilityTrigger(this.lancer);
            expect(this.player1).isReadyToTakeAction();
        });

        it('prevents entering play reactions from being triggered by the opponent', function () {
            this.player1.clickPrompt('Done');
            const opponentLancer = this.player2.findCardByName('Vanguard Lancer', 'hand');
            this.player2.clickCard(opponentLancer);

            expect(opponentLancer.location).toBe('play area');
            expect(this.player2).not.toAllowAbilityTrigger(opponentLancer);
            expect(this.player2).isReadyToTakeAction();
        });
    });

    describe('while it is not revealed', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { hand: ['Vanguard Lancer'], gold: 5 },
                player2: { inPlay: [{ card: 'Bastard in Hiding', power: 1 }] }
            });
            this.player1.clickCard(this.vanguardLancer);
        });

        it('allows entering play reactions to be triggered', function () {
            expect(this.player1).toAllowAbilityTrigger(this.vanguardLancer);
        });
    });
});
