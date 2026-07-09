describe('Dragonstone Proselyte', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Dragonstone Proselyte (OatN)',
                'Hedge Knight',
                'Stannis Baratheon (OatN)'
            ]);
            const deck2 = this.buildDeck('baratheon', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.proselyte = this.player1.findCardByName('Dragonstone Proselyte', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.proselyte);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when the action is used on a character with STR <= 3', function () {
            beforeEach(function () {
                this.player1.clickMenu(this.proselyte, 'Prevent character from standing');
                this.player1.clickCard(this.p2knight);
            });

            it('should kneel the Proselyte as cost', function () {
                expect(this.proselyte.kneeled).toBe(true);
            });

            it('should prevent the target from standing until end of round', function () {
                this.p2knight.kneeled = true;
                this.completeChallengesPhase();
                expect(this.p2knight.kneeled).toBe(true);
            });
        });

        describe('when targeting a character with STR > 3', function () {
            beforeEach(function () {
                this.highStr = this.player1.findCardByName('Stannis Baratheon', 'hand');
                this.player1.dragCard(this.highStr, 'play area');
                this.player1.clickMenu(this.proselyte, 'Prevent character from standing');
            });

            it('should not allow selecting a high-STR character', function () {
                expect(this.player1).not.toAllowSelect(this.highStr);
            });
        });
    });
});
