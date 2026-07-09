describe('Manticore Venom', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'Manticore Venom (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.venom = this.player1.findCardByName('Manticore Venom', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');

            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 5;
            this.player1.clickCard(this.venom);
            this.player1.clickPrompt('Marshal');
            this.player1.clickCard(this.cersei);
        });

        it('should remove the military icon from Cersei', function () {
            expect(this.cersei.hasIcon('military')).toBe(false);
        });

        it('should remove the intrigue icon from Cersei', function () {
            expect(this.cersei.hasIcon('intrigue')).toBe(false);
        });

        it('should remove the power icon from Cersei', function () {
            expect(this.cersei.hasIcon('power')).toBe(false);
        });

        describe('when Manticore Venom leaves play', function () {
            beforeEach(function () {
                this.player1.dragCard(this.venom, 'discard pile');
            });

            it("should restore Cersei's icons", function () {
                expect(this.cersei.hasIcon('intrigue')).toBe(true);
                expect(this.cersei.hasIcon('power')).toBe(true);
            });
        });
    });
});
