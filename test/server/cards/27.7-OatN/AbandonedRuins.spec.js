describe('Abandoned Ruins', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'Abandoned Ruins (OatN)',
                'Doran Martell (Core)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.ruins = this.player1.findCardByName('Abandoned Ruins', 'hand');
            this.doran = this.player1.findCardByName('Doran Martell', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.ruins);
            this.player1.clickCard(this.doran);
            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when opponent has more characters', function () {
            beforeEach(function () {
                this.player2.dragCard(this.p2knight, 'play area');
            });

            it('should give +1 STR to controller characters', function () {
                expect(this.doran.getStrength()).toBe(this.doran.cardData.strength + 1);
            });
        });

        describe('action: return a Martell character to hand', function () {
            it('should allow the action during the challenge phase', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.ruins,
                    'Return a Martell character to hand'
                );
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.ruins, 'Return a Martell character to hand');
                    this.player1.clickCard(this.doran);
                });

                it('should sacrifice Abandoned Ruins', function () {
                    expect(this.ruins.location).toBe('discard pile');
                });

                it('should return Doran to hand', function () {
                    expect(this.doran.location).toBe('hand');
                });
            });
        });
    });
});
