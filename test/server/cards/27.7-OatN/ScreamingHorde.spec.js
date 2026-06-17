// Claude: Screaming Horde (code 27576) - puts Dothraki from hand/discard into play temporarily
describe('Screaming Horde', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Screaming Horde (OatN)',
                'Dothraki Honor Guard',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.horde = this.player1.findCardByName('Screaming Horde', 'hand');
            this.honor = this.player1.findCardByName('Dothraki Honor Guard', 'hand');

            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.horde, 'shadows');
        });

        describe('when Screaming Horde comes out of shadows', function () {
            beforeEach(function () {
                this.player1Object.gold = 5;
                this.player1.clickCard(this.horde);
            });

            it('should allow putting a Dothraki from hand into play', function () {
                expect(this.player1).toAllowAbilityTrigger('Screaming Horde');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.horde);
                });

                it('should prompt to choose a Dothraki character from hand or discard', function () {
                    expect(this.player1).toAllowSelect(this.honor);
                });

                describe('after choosing a Dothraki character', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.honor);
                    });

                    it('should put the character into play', function () {
                        expect(this.honor.location).toBe('play area');
                    });

                    it('should return the character to hand at end of phase', function () {
                        this.completeChallengesPhase();
                        expect(this.honor.location).toBe('hand');
                    });
                });
            });
        });
    });
});
