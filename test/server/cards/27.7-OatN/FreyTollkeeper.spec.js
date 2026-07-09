describe('Frey Tollkeeper', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('neutral', [
                'A Noble Cause',
                'Frey Tollkeeper (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.tollkeeper = this.player1.findCardByName('Frey Tollkeeper', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');

            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
            this.player1Object.gold = 10;
        });

        describe('when Frey Tollkeeper is ambushed during the challenge phase', function () {
            beforeEach(function () {
                this.player1.clickCard(this.tollkeeper);
            });

            it('should enter play', function () {
                expect(this.tollkeeper.location).toBe('play area');
            });

            it('should trigger a reaction to choose an opponent', function () {
                expect(this.player1).toAllowAbilityTrigger('Frey Tollkeeper');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.tollkeeper);
                });

                describe('when the opponent initiates a challenge with too little gold', function () {
                    beforeEach(function () {
                        this.player2Object.gold = 0;
                        this.player1.clickPrompt('Done');
                        this.player2.clickPrompt('Intrigue');
                        this.player2.clickCard(this.cersei);
                        this.player2.clickPrompt('Done');
                        this.skipActionWindow();
                        this.player1.clickPrompt('Done');
                        this.skipActionWindow();
                    });

                    it('should prevent the opponent from winning the challenge', function () {
                        expect(this.player2Object.getTotalPower()).toBe(0);
                    });
                });
            });
        });
    });
});
