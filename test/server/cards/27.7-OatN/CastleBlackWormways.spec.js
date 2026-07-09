describe('Castle Black Wormways', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Castle Black Wormways (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('thenightswatch', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.wormways = this.player1.findCardByName('Castle Black Wormways', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.knight);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.wormways, 'shadows');
        });

        describe('when Castle Black Wormways comes out of shadows', function () {
            beforeEach(function () {
                this.player1Object.gold = 5;
                this.player1.clickCard(this.wormways);
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Castle Black Wormways');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.wormways);
                });

                it('should prompt to select a friendly character', function () {
                    expect(this.player1).toHavePrompt('Select a character');
                    expect(this.player1).toAllowSelect(this.knight);
                });

                describe('when a character is selected', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.knight);
                    });

                    it('should put the selected character into shadows', function () {
                        expect(this.knight.location).toBe('shadows');
                    });
                });
            });
        });
    });
});
