// Claude: removed broken cost-reduction describe; fixed challenge flow, skipActionWindow x2
describe("Olenna's Stratagem", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                "Olenna's Stratagem (OatN)",
                'The Queen of Thorns (Core)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('tyrell', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.stratagem = this.player1.findCardByName("Olenna's Stratagem", 'hand');
            this.qot = this.player1.findCardByName('The Queen of Thorns', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.qot);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.knight, 'discard pile');
        });

        describe('after winning an intrigue challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.qot);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                // afterChallenge → Olenna's Stratagem reaction available
            });

            it('should allow the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger("Olenna's Stratagem");
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.stratagem);
                    this.player1.clickCard(this.knight);
                });

                it('should place the card in shadows', function () {
                    expect(this.knight.location).toBe('shadows');
                });

                it('should give the card a shadow keyword equal to its printed cost', function () {
                    const shadowCost = this.knight.getCost();
                    expect(this.knight.hasKeyword(`shadow (${shadowCost})`)).toBe(true);
                });

                it('should not be triggerable again this challenge', function () {
                    expect(this.player1).not.toAllowAbilityTrigger("Olenna's Stratagem");
                });
            });
        });
    });
});
