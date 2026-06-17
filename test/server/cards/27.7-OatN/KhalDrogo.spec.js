// Claude: Drogo only in setup (cost 7 fits limit), Honor Guard marshalled after selectFirstPlayer
describe('Khal Drogo (OatN)', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Khal Drogo (OatN)',
                'Dothraki Honor Guard',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.drogo = this.player1.findCardByName('Khal Drogo', 'hand');
            this.honor = this.player1.findCardByName('Dothraki Honor Guard', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.drogo);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1.clickCard(this.honor);
            this.completeMarshalPhase();

            this.honor.kneeled = true;
        });

        describe('after winning a challenge by 5+ STR as attacker', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.drogo);
                this.player1.clickCard(this.honor);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
            });

            it('should allow standing a Dothraki character', function () {
                expect(this.player1).toAllowAbilityTrigger('Khal Drogo');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.drogo);
                });

                it('should allow selecting only Dothraki characters', function () {
                    expect(this.player1).toAllowSelect(this.honor);
                    expect(this.player1).not.toAllowSelect(this.knight);
                });

                describe('after standing a Dothraki character', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.honor);
                    });

                    it('should stand the Dothraki character', function () {
                        expect(this.honor.kneeled).toBe(false);
                    });
                });
            });
        });
    });
});
