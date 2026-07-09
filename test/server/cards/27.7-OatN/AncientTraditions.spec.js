describe('Ancient Traditions', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Ancient Traditions (OatN)',
                'Bran Stark (BtB)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.traditions = this.player1.findCardByName('Ancient Traditions', 'hand');
            this.bran = this.player1.findCardByName('Bran Stark', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.bran);
            this.player2.clickCard(this.player2.findCardByName('Cersei Lannister', 'hand'));
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 5;
        });

        describe('when attached to Bran Stark (Old Gods)', function () {
            beforeEach(function () {
                this.player1.clickCard(this.traditions);
                this.player1.clickCard(this.bran);
                this.completeMarshalPhase();
            });

            it('should give Bran +1 STR', function () {
                expect(this.bran.getStrength()).toBe(this.bran.cardData.strength + 1);
            });
        });

        describe('when attached to any character', function () {
            it('should allow attaching to a non-Old Gods character', function () {
                this.player1.dragCard(this.knight, 'play area');
                this.player1.clickCard(this.traditions);
                expect(this.player1).toAllowSelect(this.knight);
            });

            it('should allow attaching to an Old Gods character', function () {
                this.player1.clickCard(this.traditions);
                expect(this.player1).toAllowSelect(this.bran);
            });
        });
    });
});
