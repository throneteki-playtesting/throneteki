// Claude: Hedge Knight as attacker (Galazza has no Military icon), reaction on onDominancePhaseEnded
describe('Galazza Galare', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Galazza Galare (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.galazza = this.player1.findCardByName('Galazza Galare', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.galazza);
            this.player1.clickCard(this.knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when neither player applies military claim', function () {
            it('should allow gaining 2 power (1 per player)', function () {
                this.completeChallengesPhase();
                expect(this.player1).toAllowAbilityTrigger('Galazza Galare');
            });

            describe('when the interrupt triggers', function () {
                beforeEach(function () {
                    this.player1Object.faction.power = 0;
                    this.player1Object.gold = 0;
                    // player2 gold must exceed player1's dominance (4+2+0=6) to prevent player1 winning dominance
                    this.player2Object.gold = 7;
                    this.completeChallengesPhase();
                    this.player1.triggerAbility(this.galazza);
                });

                it('should gain 2 power on the faction card', function () {
                    expect(this.player1Object.faction.power).toBe(2);
                });
            });
        });

        describe('when player 1 applies military claim', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Apply Claim');
                this.player2.clickPrompt('Done');
            });

            it('should still trigger (player 2 did not apply military claim)', function () {
                this.completeChallengesPhase();
                expect(this.player1).toAllowAbilityTrigger('Galazza Galare');
            });

            describe('when the interrupt triggers after only player 1 applied military', function () {
                beforeEach(function () {
                    this.player1Object.faction.power = 0;
                    this.player1Object.gold = 0;
                    this.completeChallengesPhase();
                    this.player1.triggerAbility(this.galazza);
                });

                it('should gain only 1 power', function () {
                    expect(this.player1Object.faction.power).toBe(1);
                });
            });
        });
    });
});
