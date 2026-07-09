describe('Captain of the Iron Fleet', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                'Captain of the Iron Fleet (OatN)',
                'Victarion Greyjoy (R)',
                'The Balerion (AHaH)'
            ]);
            const deck2 = this.buildDeck('greyjoy', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.captain = this.player1.findCardByName('Captain of the Iron Fleet', 'hand');
            this.victarion = this.player1.findCardByName('Victarion Greyjoy', 'hand');
            this.balerion = this.player1.findCardByName('The Balerion', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.victarion);
            this.player1.clickCard(this.balerion);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player1.clickCard(this.captain);
            this.player1.clickCard(this.victarion);
            this.completeMarshalPhase();
        });

        it('should give Victarion the Captain trait via whileAttached', function () {
            expect(this.victarion.hasTrait('Captain')).toBe(true);
        });

        describe('during a military challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Done');
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.p2knight);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
            });

            it('should allow triggering the action to add Victarion', function () {
                expect(this.player1).toAllowTriggerAction(this.captain, 'Participate in challenge');
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.captain, 'Participate in challenge');
                    this.player1.clickCard(this.balerion);
                });

                it('should kneel the Captain and the Warship', function () {
                    expect(this.captain.kneeled).toBe(true);
                    expect(this.balerion.kneeled).toBe(true);
                });

                it('should add Victarion to the challenge', function () {
                    expect(this.victarion.isParticipating()).toBe(true);
                });
            });
        });
    });
});
