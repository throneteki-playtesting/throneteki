describe("The Merman's Shield", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                "The Merman's Shield (OatN)",
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.shield = this.player1.findCardByName("The Merman's Shield", 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');

            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();

            this.player1.dragCard(this.shield, 'shadows');
        });

        describe('when Shield comes out of shadows during a challenge and a kneeled defender shares a trait', function () {
            beforeEach(function () {
                // Add "Commander" trait to Cersei so she shares a trait with the Shield
                this.cersei.addTrait('Commander');

                this.player2.clickPrompt('Power');
                this.player2.clickCard(this.cersei);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.cersei.kneeled = true;
                this.player1.clickPrompt('Done');
                this.skipActionWindow();

                this.player1Object.gold = 5;
                this.player1.clickCard(this.shield);
            });

            it('should allow the reaction to stand a kneeled defender sharing a trait', function () {
                expect(this.player1).toAllowAbilityTrigger("The Merman's Shield");
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.shield);
                    this.player1.clickCard(this.cersei);
                });

                it('should stand the selected defender', function () {
                    expect(this.cersei.kneeled).toBe(false);
                });

                it('should give both the Shield and the target Renown until end of phase', function () {
                    expect(this.shield.hasKeyword('renown')).toBe(true);
                    expect(this.cersei.hasKeyword('renown')).toBe(true);
                });
            });
        });
    });
});
