describe('Shadow City Septon', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'Shadow City Septon (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.septon = this.player1.findCardByName('Shadow City Septon', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');

            this.player1.clickCard(this.septon);
            this.player2.clickCard(this.cersei);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.completeMarshalPhase();
            this.completeChallengesPhase();
            // Player2 must have more gold to win dominance; Cersei must be standing
            this.player1Object.gold = 0;
            this.player2Object.gold = 10;
        });

        describe('when player2 wins dominance with a standing character', function () {
            it('should allow sacrificing the Septon to return a standing opponent character to hand', function () {
                expect(this.player1).toAllowAbilityTrigger('Shadow City Septon');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.septon);
                    this.player1.clickCard(this.cersei);
                });

                it('should return Cersei to hand', function () {
                    expect(this.cersei.location).toBe('hand');
                });

                it('should sacrifice the Septon', function () {
                    expect(this.septon.location).toBe('discard pile');
                });
            });
        });

        describe('when the winning opponent only has kneeled characters', function () {
            beforeEach(function () {
                this.cersei.kneeled = true;
            });

            it('should not allow targeting a kneeled character', function () {
                this.player1.triggerAbility(this.septon);
                expect(this.player1).not.toAllowSelect(this.cersei);
            });
        });
    });
});
