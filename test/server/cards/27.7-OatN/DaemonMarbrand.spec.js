// Claude: renamed Daemon->Damon (JSON name), fixed challenge flow, skipActionWindow x2, intrigue claim handling
describe('Damon Marbrand', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Damon Marbrand (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Hedge Knight',
                'Cersei Lannister (Core)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.daemon = this.player1.findCardByName('Damon Marbrand', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');

            this.player1.clickCard(this.daemon);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe("when a character is discarded from opponent's hand via intrigue claim", function () {
            beforeEach(function () {
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.daemon);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Apply Claim');
                this.player2.clickCard(this.cersei);
            });

            it('should allow Damon Marbrand to react', function () {
                expect(this.player1).toAllowAbilityTrigger('Damon Marbrand');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.daemon);
                });

                it('should prompt the opponent to return a character to hand', function () {
                    expect(this.player2).toHavePrompt('Select a character to return to hand');
                });

                describe('when the opponent selects a character', function () {
                    beforeEach(function () {
                        this.player2.clickCard(this.p2knight);
                    });

                    it('should return that character to hand', function () {
                        expect(this.p2knight.location).toBe('hand');
                    });
                });
            });
        });
    });
});
