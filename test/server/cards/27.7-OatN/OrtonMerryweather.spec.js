// Claude: dominance interrupt on onDominanceDetermined; player2 passes after intrigue claim (not completeChallengesPhase)
describe('Orton Merryweather', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                'Orton Merryweather (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('tyrell', ['A Noble Cause', 'Margaery Tyrell (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.orton = this.player1.findCardByName('Orton Merryweather', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2margaery = this.player2.findCardByName('Margaery Tyrell', 'hand');

            this.player1.clickCard(this.orton);
            this.player2.clickCard(this.p2margaery);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when dominance is determined without losing an intrigue challenge', function () {
            it('should allow gaining 2 gold', function () {
                this.completeChallengesPhase();
                expect(this.player1).toAllowAbilityTrigger('Orton Merryweather');
            });

            describe('when the interrupt triggers', function () {
                beforeEach(function () {
                    this.player1Object.gold = 0;
                    // Enable taxation window so game pauses there before resetForStartOfRound resets gainedGold
                    this.player1.togglePromptedActionWindow('taxation', true);
                    this.completeChallengesPhase();
                    this.goldBefore = this.player1Object.gainedGold;
                    this.player1.triggerAbility(this.orton);
                });

                it('should gain 2 gold', function () {
                    expect(this.player1Object.gainedGold - this.goldBefore).toBe(2);
                });
            });
        });

        describe('when an intrigue challenge was lost this round', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Done');
                this.player2.clickPrompt('Intrigue');
                this.player2.clickCard(this.p2margaery);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Apply Claim');
                this.player1.clickCard(this.knight);
            });

            it('should not allow the interrupt', function () {
                // player2 passes their remaining challenge turn, then challenges end → dominance
                this.player2.clickPrompt('Done');
                expect(this.player1).not.toAllowAbilityTrigger('Orton Merryweather');
            });
        });
    });
});
