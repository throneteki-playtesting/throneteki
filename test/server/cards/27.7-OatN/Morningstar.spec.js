// Claude: attachment no longer gives +2 STR; use QoT (6 STR) + Margaery (3 STR) for 5+ diff in Intrigue
describe('Morningstar', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                'Morningstar (OatN)',
                'Margaery Tyrell (Core)',
                'The Queen of Thorns (Core)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('tyrell', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.morningstar = this.player1.findCardByName('Morningstar', 'hand');
            this.margaery = this.player1.findCardByName('Margaery Tyrell', 'hand');
            this.qot = this.player1.findCardByName('The Queen of Thorns', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.margaery);
            this.player1.clickCard(this.morningstar);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.player1.clickCard(this.morningstar);
            this.player1.clickCard(this.margaery);
            this.selectFirstPlayer(this.player1);

            this.player1.clickCard(this.qot);
            this.completeMarshalPhase();
        });

        describe('after winning an Intrigue challenge by 5+ STR with the attached character', function () {
            beforeEach(function () {
                // Margaery (3) + QoT (6) vs no defenders → diff = 9 ≥ 5
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.margaery);
                this.player1.clickCard(this.qot);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                // afterChallenge → Morningstar reaction available
            });

            it('should allow standing and removing the attached character from the challenge', function () {
                expect(this.player1).toAllowAbilityTrigger('Morningstar');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.morningstar);
                });

                it('should stand Margaery', function () {
                    expect(this.margaery.kneeled).toBe(false);
                });

                it('should remove Margaery from the challenge', function () {
                    expect(this.margaery.isParticipating()).toBe(false);
                });
            });
        });

        describe('when the challenge is won by less than 5 STR', function () {
            it('should not allow the reaction', function () {
                // Margaery (3) vs no defenders → diff = 3 < 5
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.margaery);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                expect(this.player1).not.toAllowAbilityTrigger('Morningstar');
            });
        });
    });
});
