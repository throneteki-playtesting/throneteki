describe('Priest on the Docks', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                'Priest on the Docks (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Lannisport (Core)',
                'Frozen Solid (WotN)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.priest = this.player1.findCardByName('Priest on the Docks', 'hand');
            this.frozenSolid = this.player2.findCardByName('Frozen Solid', 'hand');
            this.lannisport = this.player2.findCardByName('Lannisport', 'hand');

            this.player1.clickCard(this.priest);
            this.player2.clickCard(this.lannisport);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player2Object.gold = 5;
            this.player1.clickPrompt('Done');
            this.player2.clickCard(this.frozenSolid);
            this.player2.clickCard(this.lannisport);
            this.player2.clickPrompt('Done');

            this.player1Object.gold = 10;
            this.player2Object.gold = 0;
            this.completeChallengesPhase();
        });

        describe('when player1 wins dominance', function () {
            it('should allow killing the Priest to discard an opponent location or attachment', function () {
                expect(this.player1).toAllowAbilityTrigger('Priest on the Docks');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.priest);
                    this.player1.clickCard(this.frozenSolid);
                });

                it('should kill the Priest', function () {
                    expect(this.priest.location).toBe('dead pile');
                });

                it('should discard the target attachment', function () {
                    expect(this.frozenSolid.location).toBe('discard pile');
                });
            });
        });
    });
});
