// Claude: event played via clickCard (getPlayActions path); toHavePrompt replaces toAllowTriggerAction for hand events
describe('Toast in Secret', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Toast in Secret (OatN)',
                'Margaery Tyrell (Core)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.toast = this.player1.findCardByName('Toast in Secret', 'hand');
            this.margaery = this.player1.findCardByName('Margaery Tyrell', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.margaery);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.toast, 'shadows');
            this.player1.dragCard(this.knight, 'shadows');
        });

        describe('during a power challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Power');
                this.player1.clickCard(this.margaery);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
            });

            it('should show the target prompt when triggered', function () {
                this.player1.clickCard(this.toast);
                expect(this.player1).toHavePrompt('Select a character');
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.toast);
                    this.player1.clickCard(this.margaery);
                });

                it('should boost Margaery by the number of cards in shadows', function () {
                    const shadowsCount = this.player1Object.shadows.length;
                    expect(this.margaery.getStrength()).toBe(
                        this.margaery.cardData.strength + shadowsCount
                    );
                });
            });
        });
    });
});
