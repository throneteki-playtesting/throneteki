describe('Sunspear Sentinel', function () {
    describe('when discarded from hand for intrigue claim', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: { hand: ['Sunspear Sentinel'] },
                player2: { inPlay: ['House Maester'] }
            });
            this.attacker = this.player2.findCardByName('House Maester', 'play area');
            this.player2.clickPrompt('Intrigue');
            this.player2.clickCard(this.attacker);
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('is put into play instead of the discard pile', function () {
            expect(this.player1).toAllowAbilityTrigger(this.sunspearSentinel);
            this.player1.triggerAbility(this.sunspearSentinel);

            expect(this.sunspearSentinel.location).toBe('play area');
            expect(this.player1Object.discardPile.length).toBe(0);
            expect(this.player2).isReadyToTakeAction();
        });

        it('can be declined', function () {
            this.player1.clickPrompt('Pass');

            expect(this.sunspearSentinel.location).toBe('discard pile');
        });
    });

    describe('when discarded to meet reserve', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    hand: [
                        'Sunspear Sentinel',
                        'House Maester',
                        'House Maester',
                        'House Maester',
                        'House Maester',
                        'House Maester',
                        'House Maester'
                    ]
                },
                player2: {}
            });
            this.completeChallengesPhase();
            this.player1.clickCard(this.sunspearSentinel);
            this.player1.clickPrompt('Done');
        });

        it('is not offered because it is not intrigue claim', function () {
            expect(this.sunspearSentinel.location).toBe('discard pile');
            expect(this.player1).not.toAllowAbilityTrigger(this.sunspearSentinel);
        });
    });
});
