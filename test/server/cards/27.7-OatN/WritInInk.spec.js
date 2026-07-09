describe('Writ in Ink', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                'Writ in Ink (OatN)',
                'Earl Harlaw (OatN)',
                'Fleet from Ten Towers (BtB)'
            ]);
            const deck2 = this.buildDeck('greyjoy', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.earl = this.player1.findCardByName('Earl Harlaw', 'hand');
            this.fleet = this.player1.findCardByName('Fleet from Ten Towers', 'hand');
            this.writ = this.player1.findCardByName('Writ in Ink', 'hand');

            this.player1.clickCard(this.earl);
            this.player1.clickCard(this.fleet);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('during an intrigue challenge with Earl Harlaw attacking', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.earl);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
            });

            it('should be playable to add the Fleet to the challenge', function () {
                this.player1.clickCard(this.writ);
                expect(this.player1).toAllowSelect(this.fleet);
            });

            describe('when played', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.writ);
                    this.player1.clickCard(this.fleet);
                });

                it('should add the Fleet to the intrigue challenge', function () {
                    expect(this.fleet.isParticipating()).toBe(true);
                });
            });
        });

        describe('outside of an intrigue challenge', function () {
            it('should not be playable', function () {
                expect(this.player1).not.toAllowTriggerAction(this.writ, 'Add to challenge');
            });
        });
    });
});
