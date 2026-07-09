describe('Superstitious Steward', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Counting Coppers (Core)',
                'Superstitious Steward (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'The Winds of Winter (Core)',
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.steward = this.player1.findCardByName('Superstitious Steward', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.steward);
            this.player2.clickCard(this.cersei);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
        });

        describe('when plot phase starts', function () {
            it('should allow the Steward to react', function () {
                expect(this.player1).toAllowAbilityTrigger('Superstitious Steward');
            });

            describe('when triggered and Winter is named', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.steward);
                    this.player1.nameTrait('Winter');
                    this.player1.selectPlot('A Noble Cause');
                    this.player2.selectPlot('The Winds of Winter');
                    this.selectFirstPlayer(this.player1);
                });

                it('should prompt player2 to sacrifice a character or location', function () {
                    expect(this.player2).toHavePrompt(
                        'Select a character or location to sacrifice'
                    );
                });

                describe('when player2 sacrifices a character', function () {
                    beforeEach(function () {
                        this.player2.clickCard(this.cersei);
                    });

                    it('should sacrifice Cersei', function () {
                        expect(this.cersei.location).toBe('discard pile');
                    });
                });
            });

            describe('when the named trait does not match the opponent plot', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.steward);
                    this.player1.nameTrait('Summer');
                    this.player1.selectPlot('A Noble Cause');
                    this.player2.selectPlot('The Winds of Winter');
                    this.selectFirstPlayer(this.player1);
                });

                it('should not prompt player2 to sacrifice', function () {
                    expect(this.player2).not.toHavePrompt(
                        'Select a character or location to sacrifice'
                    );
                });
            });
        });
    });
});
