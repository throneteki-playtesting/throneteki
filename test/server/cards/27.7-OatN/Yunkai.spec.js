// Claude: draw 2 triggered via military claim kill (not dragCard) to fire onCharacterKilled event
describe('Yunkai', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Yunkai (OatN)',
                'Hedge Knight',
                'Hedge Knight',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.yunkai = this.player1.findCardByName('Yunkai', 'hand');
            [this.knight1, this.discardKnight, this.hk3] = this.player1.filterCardsByName(
                'Hedge Knight',
                'hand'
            );
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.yunkai);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1.clickCard(this.knight1);
            this.completeMarshalPhase();
        });

        describe('during a challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight1);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickCard(this.p2knight);
                this.player2.clickPrompt('Done');
            });

            it('should allow the action', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.yunkai,
                    'Give participating character -2 STR'
                );
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.yunkai, 'Give participating character -2 STR');
                    this.player1.clickCard(this.discardKnight);
                    this.player1.clickCard(this.p2knight);
                });

                it('should give the target -2 STR', function () {
                    expect(this.p2knight.getStrength()).toBe(this.p2knight.cardData.strength - 2);
                });

                it('should kneel Yunkai', function () {
                    expect(this.yunkai.kneeled).toBe(true);
                });

                it('should discard a card from hand', function () {
                    expect(this.discardKnight.location).toBe('discard pile');
                });

                describe('when the targeted character is killed via claim', function () {
                    beforeEach(function () {
                        // Put cards in deck so Yunkai can draw 2 (deck is empty after marshal/discard)
                        this.player1.dragCard(this.discardKnight, 'draw deck');
                        this.player1.dragCard(this.hk3, 'draw deck');
                        this.initialHandSize = this.player1.handSize;
                        // After Yunkai action, window resets with defender (player2) prompted first
                        this.player2.clickPrompt('Pass');
                        this.player1.clickPrompt('Pass');
                        // "Perform before claim actions" IS the afterChallenge window — no skipActionWindow needed
                        this.player1.clickPrompt('Apply Claim');
                        this.player2.clickCard(this.p2knight);
                    });

                    it('should draw 2 cards', function () {
                        expect(this.player1.handSize).toBe(this.initialHandSize + 2);
                    });
                });
            });
        });
    });
});
