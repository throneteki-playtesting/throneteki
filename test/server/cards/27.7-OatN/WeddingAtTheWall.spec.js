// Claude: shadows check moved to `when` condition; dragCard to shadows in inner beforeEach to avoid undo issues
describe('Wedding at the Wall', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Wedding at the Wall (OatN)',
                'Ygritte',
                'Margaery Tyrell (Core)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('thenightswatch', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.wedding = this.player1.findCardByName('Wedding at the Wall', 'hand');
            this.ygritte = this.player1.findCardByName('Ygritte', 'hand');
            this.margaery = this.player1.findCardByName('Margaery Tyrell', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.ygritte);
            this.player1.clickCard(this.margaery);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when a power challenge is initiated with cards in shadows', function () {
            beforeEach(function () {
                this.player1.dragCard(this.knight, 'shadows');
                this.player1.clickPrompt('Power');
                this.player1.clickCard(this.margaery);
                this.player1.clickPrompt('Done');
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Wedding at the Wall');
            });

            describe('when the reaction is triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.wedding);
                });

                it("should give Wildling characters the R'hllor and Wildling traits", function () {
                    expect(this.ygritte.hasTrait("R'hllor")).toBe(true);
                    expect(this.ygritte.hasTrait('Wildling')).toBe(true);
                });
            });
        });

        describe('when no cards are in shadows', function () {
            it('should not allow the reaction', function () {
                // No dragCard to shadows — shadows is empty
                this.player1.clickPrompt('Power');
                this.player1.clickCard(this.margaery);
                this.player1.clickPrompt('Done');
                expect(this.player1).not.toAllowAbilityTrigger('Wedding at the Wall');
            });
        });
    });
});
