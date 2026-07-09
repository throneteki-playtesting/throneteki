describe('Starry Septa', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                'Starry Septa (OatN)',
                'Hedge Knight',
                'Margaery Tyrell (Core)'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.septa = this.player1.findCardByName('Starry Septa', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.margaery = this.player1.findCardByName('Margaery Tyrell', 'hand');

            this.player1.clickCard(this.septa);
            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when a character with power is participating', function () {
            beforeEach(function () {
                // Give Cersei some power for the action condition
                this.cersei.modifyPower(2);
                this.player2.clickPrompt('Power');
                this.player2.clickCard(this.cersei);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickCard(this.margaery);
                this.player1.clickPrompt('Done');
            });

            it('should allow the action to stand and remove Cersei', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.septa,
                    'Stand and remove participating character'
                );
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.septa, 'Stand and remove participating character');
                    this.player1.clickCard(this.cersei);
                });

                it('should stand Cersei', function () {
                    expect(this.cersei.kneeled).toBe(false);
                });

                it('should remove Cersei from the challenge', function () {
                    expect(this.cersei.isParticipating()).toBe(false);
                });

                it('should kneel the Septa as cost', function () {
                    expect(this.septa.kneeled).toBe(true);
                });
            });
        });

        describe('when a participating character has no power or gold tokens', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Power');
                this.player2.clickCard(this.cersei);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
            });

            it('should not allow the action when target has no power or gold', function () {
                expect(this.player1).not.toAllowTriggerAction(
                    this.septa,
                    'Stand and remove participating character'
                );
            });
        });
    });
});
