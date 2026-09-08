describe('Sentinels of the Realm', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('lannister', [
                'Sentinels of the Realm',
                'A Noble Cause',
                'Nightmares',
                'Nightmares',
                'Palace Spearman',
                { name: 'Hedge Knight', count: 12 }
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();
            this.completeSetup();
            this.selectFirstPlayer(this.player1);

            // Force the cards this spec needs into hand, regardless of shuffle order.
            this.guard = this.player1.findCardByName('Palace Spearman', 'any');
            this.knight = this.player1.findCardByName('Hedge Knight', 'any');
            [this.event1, this.event2] = this.player1.filterCardsByName('Nightmares', 'any');
            this.player1.dragCard(this.guard, 'hand');
            this.player1.dragCard(this.knight, 'hand');
            this.player1.dragCard(this.event1, 'hand');
            this.player1.dragCard(this.event2, 'hand');
        });

        describe('while controlling a Guard character', function () {
            beforeEach(function () {
                this.player1.clickCard(this.guard);
            });

            it('should allow playing events', function () {
                this.player1.clickCard(this.event1);
                expect(this.player1).toHavePrompt('Select a character or location');
            });
        });

        describe('while not controlling a Guard character', function () {
            beforeEach(function () {
                this.player1.clickCard(this.knight);
            });

            it('should not allow playing events', function () {
                this.player1.clickCard(this.event1);
                expect(this.player1).not.toHavePrompt('Select a character or location');
                expect(this.event1.location).toBe('hand');
            });
        });

        describe('at the end of the challenges phase', function () {
            beforeEach(function () {
                this.completeMarshalPhase();
                this.initialHandSize = this.player1.handSize;
            });

            describe('when no challenges were initiated against the controller', function () {
                beforeEach(function () {
                    this.completeChallengesPhase();
                    this.player1.triggerAbility('Sentinels of the Realm');
                });

                it('should draw 3 cards', function () {
                    expect(this.player1.handSize).toBe(this.initialHandSize + 3);
                });
            });
        });
    });
});
