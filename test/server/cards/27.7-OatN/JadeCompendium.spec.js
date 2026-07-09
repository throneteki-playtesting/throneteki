describe('Jade Compendium', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'Fealty',
                'A Noble Cause',
                'Jade Compendium (OatN)',
                'Samwell Tarly (Core)',
                { name: 'Hedge Knight', count: 10 }
            ]);
            const deck2 = this.buildDeck('lannister', ['A Noble Cause', 'Cersei Lannister (Core)']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.compendium = this.player1.findCardByName('Jade Compendium');
            this.sam = this.player1.findCardByName('Samwell Tarly');
            this.player1.dragCard(this.compendium, 'hand');
            this.player1.dragCard(this.sam, 'hand');

            this.player1.clickCard(this.sam);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player1.clickCard(this.compendium);
            this.player1.clickCard(this.sam);
            this.completeMarshalPhase();
        });

        it('should enter play attached to Sam', function () {
            expect(this.compendium.location).toBe('play area');
            expect(this.compendium.parent).toBe(this.sam);
        });

        describe('when player1 wins an intrigue challenge with Sam participating', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.sam);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
            });

            it('should allow the Compendium reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Jade Compendium');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.handSizeBefore = this.player1.handSize;
                    this.player1.triggerAbility(this.compendium);
                });

                it('should kneel the Compendium and draw 2 cards', function () {
                    expect(this.compendium.kneeled).toBe(true);
                    expect(this.player1.handSize).toBe(this.handSizeBefore + 2);
                });

                describe('when a card is placed under the agenda', function () {
                    beforeEach(function () {
                        this.handCard = this.player1.filterCardsByName('Hedge Knight', 'hand')[0];
                        this.player1.clickCard(this.handCard);
                    });

                    it('should place the card facedown under the agenda', function () {
                        expect(this.player1Object.agenda.underneath).toContain(this.handCard);
                        expect(this.handCard.facedown).toBe(true);
                        expect(this.player1.handSize).toBe(this.handSizeBefore + 1);
                    });
                });
            });
        });
    });
});
