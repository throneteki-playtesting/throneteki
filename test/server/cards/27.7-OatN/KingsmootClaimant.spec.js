describe('Kingsmoot Claimant', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                'Kingsmoot Claimant (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('greyjoy', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.claimant = this.player1.findCardByName('Kingsmoot Claimant', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.claimant);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when Kingsmoot Claimant is attacking and controller has no other King', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.claimant);
                this.player1.clickPrompt('Done');
            });

            it('should gain the King trait while attacking', function () {
                expect(this.claimant.hasTrait('King')).toBe(true);
            });

            it('should gain Renown while attacking', function () {
                expect(this.claimant.hasKeyword('renown')).toBe(true);
            });
        });

        describe('when controller has another King character in play', function () {
            beforeEach(function () {
                this.player1.dragCard(
                    this.player1.findCardByName('Hedge Knight', 'hand'),
                    'play area'
                );
                const knight = this.player1.findCardByName('Hedge Knight', 'play area');
                knight.addTrait('King');
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.claimant);
                this.player1.clickPrompt('Done');
            });

            it('should not gain the King trait', function () {
                expect(this.claimant.hasTrait('King')).toBe(false);
            });
        });
    });
});
