describe('Bright-Eyed Recruit', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Bright-Eyed Recruit (OatN)',
                'Highborn Recruit (ChoS)'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.recruit = this.player1.findCardByName('Bright-Eyed Recruit', 'hand');
            this.highborn = this.player1.findCardByName('Highborn Recruit', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.recruit);
            this.player1.clickCard(this.highborn);
            this.player2.clickCard(this.cersei);
            this.player2.clickCard(this.knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.completeMarshalPhase();

            this.highborn.kneeled = true;
        });

        describe('when Bright-Eyed Recruit is declared as a defender', function () {
            beforeEach(function () {
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.knight);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickCard(this.recruit);
                this.player1.clickPrompt('Done');
            });

            it('should allow the reaction to stand another Recruit', function () {
                expect(this.player1).toAllowAbilityTrigger('Bright-Eyed Recruit');
            });

            describe('when triggered targeting the Highborn Recruit', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.recruit);
                    this.player1.clickCard(this.highborn);
                });

                it('should stand the Highborn Recruit', function () {
                    expect(this.highborn.kneeled).toBe(false);
                });
            });

            describe('when targeting a kneeled opponent character', function () {
                beforeEach(function () {
                    this.cersei.kneeled = true;
                    this.player1.triggerAbility(this.recruit);
                });

                it('should allow selecting a kneeled opponent character', function () {
                    expect(this.player1).toAllowSelect(this.cersei);
                });
            });
        });
    });
});
