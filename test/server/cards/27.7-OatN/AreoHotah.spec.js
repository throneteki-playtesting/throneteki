describe('Areo Hotah', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'Areo Hotah (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.areo = this.player1.findCardByName('Areo Hotah', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');

            this.player1.clickCard(this.areo);
            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when no challenges were initiated against player1 this phase', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Done');
                this.player1.clickPrompt('Done');
            });

            it('should allow triggering the interrupt at end of challenge phase', function () {
                expect(this.player1).toAllowAbilityTrigger('Areo Hotah');
            });

            describe('when triggered with no challenges against player1', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.areo);
                });

                it('should give Areo Hotah 3 power (one per type not initiated against him)', function () {
                    expect(this.areo.getPower()).toBe(3);
                });
            });
        });

        describe('when one challenge type was initiated against player1', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Intrigue');
                this.player2.clickCard(this.cersei);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Apply Claim');
                this.player2.clickPrompt('Done');
                this.player1.clickPrompt('Done');
            });

            describe('when triggered at end of challenge phase', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.areo);
                });

                it('should give Areo Hotah 2 power (only intrigue and power not initiated)', function () {
                    expect(this.areo.getPower()).toBe(2);
                });
            });
        });
    });
});
