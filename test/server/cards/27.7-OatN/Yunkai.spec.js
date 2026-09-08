// Claude: draw 1 per killed target triggered via military claim kill (not dragCard) to fire onCharacterKilled event
describe('Yunkai', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Yunkai (OatN)',
                'Hedge Knight',
                'Hedge Knight',
                'Hedge Knight',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Hedge Knight',
                'Braided Warrior'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.yunkai = this.player1.findCardByName('Yunkai', 'hand');
            [this.knight1, this.knight2, this.discardKnight, this.filler] =
                this.player1.filterCardsByName('Hedge Knight', 'hand');
            this.p2knight1 = this.player2.findCardByName('Hedge Knight', 'hand');
            this.p2knight2 = this.player2.findCardByName('Braided Warrior', 'hand');

            this.player1.clickCard(this.yunkai);
            this.player2.clickCard(this.p2knight1);
            this.player2.clickCard(this.p2knight2);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1.clickCard(this.knight1);
            this.player1.clickCard(this.knight2);
            this.completeMarshalPhase();
        });

        describe('during a challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight1);
                this.player1.clickCard(this.knight2);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickCard(this.p2knight1);
                this.player2.clickCard(this.p2knight2);
                this.player2.clickPrompt('Done');
            });

            it('should allow the action', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.yunkai,
                    'Give up to 2 participating characters -1 STR'
                );
            });

            describe('when the action is used targeting 2 characters', function () {
                beforeEach(function () {
                    this.player1.clickMenu(
                        this.yunkai,
                        'Give up to 2 participating characters -1 STR'
                    );
                    this.player1.clickCard(this.discardKnight);
                    this.player1.clickCard(this.p2knight1);
                    this.player1.clickCard(this.p2knight2);
                    this.player1.clickPrompt('Done');
                });

                it('should give each target -1 STR', function () {
                    expect(this.p2knight1.getStrength()).toBe(this.p2knight1.cardData.strength - 1);
                    expect(this.p2knight2.getStrength()).toBe(this.p2knight2.cardData.strength - 1);
                });

                it('should kneel Yunkai', function () {
                    expect(this.yunkai.kneeled).toBe(true);
                });

                it('should discard a card from hand', function () {
                    expect(this.discardKnight.location).toBe('discard pile');
                });

                describe('when one of the targeted characters is killed via claim', function () {
                    beforeEach(function () {
                        // Put a card in deck so Yunkai can draw 1 (deck is empty after marshal/discard)
                        this.player1.dragCard(this.filler, 'draw deck');
                        this.initialHandSize = this.player1.handSize;
                        // After Yunkai action, window resets with defender (player2) prompted first
                        this.player2.clickPrompt('Pass');
                        this.player1.clickPrompt('Pass');
                        this.player1.clickPrompt('Apply Claim');
                        this.player2.clickCard(this.p2knight1);
                    });

                    it('should draw 1 card', function () {
                        expect(this.player1.handSize).toBe(this.initialHandSize + 1);
                    });

                    it('should not affect the surviving target', function () {
                        expect(this.p2knight2.location).toBe('play area');
                    });
                });
            });
        });
    });
});
