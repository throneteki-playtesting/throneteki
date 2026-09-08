describe('Woods Witch', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Woods Witch (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'Gold Cloaks (Core)',
                "King's Landing (SoKL)",
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.witch = this.player1.findCardByName('Woods Witch', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.goldCloaks = this.player2.findCardByName('Gold Cloaks', 'hand');
            this.kingsLanding = this.player2.findCardByName("King's Landing", 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.witch);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player2Object.gold = 10;
            this.player1.clickPrompt('Done');
            this.player2.clickCard(this.goldCloaks);
            this.player2.clickCard(this.kingsLanding);
            this.player2.clickPrompt('Done');

            // Gold Cloaks and King's Landing both share Cersei's printed cost of 4
            expect(this.goldCloaks.getPrintedCost()).toBe(this.cersei.getPrintedCost());
            expect(this.kingsLanding.getPrintedCost()).toBe(this.cersei.getPrintedCost());
        });

        describe('when an opponent discards a character from hand (via intrigue claim)', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Intrigue');
                this.player1.clickCard(this.witch);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Apply Claim');
                this.player2.clickCard(this.cersei);
            });

            it('should allow the Woods Witch to react', function () {
                expect(this.player1).toAllowAbilityTrigger('Woods Witch');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.witch);
                });

                it('should sacrifice the Woods Witch', function () {
                    expect(this.witch.location).toBe('discard pile');
                });

                it('should prompt the controller to name a card type', function () {
                    expect(this.player1).toHavePromptButton('Character');
                    expect(this.player1).toHavePromptButton('Location');
                    expect(this.player1).toHavePromptButton('Attachment');
                });

                describe('and Character is named', function () {
                    beforeEach(function () {
                        this.player1.clickPrompt('Character');
                    });

                    it('should prompt the opponent to sacrifice a character of matching cost', function () {
                        expect(this.player2).toHavePrompt(
                            'Select a character with printed cost ' +
                                this.cersei.getPrintedCost() +
                                ' to sacrifice'
                        );
                    });

                    it('should only allow selecting the matching-cost character, not the matching-cost location', function () {
                        expect(this.player2).toAllowSelect(this.goldCloaks);
                        expect(this.player2).not.toAllowSelect(this.kingsLanding);
                    });

                    describe('when the character is selected', function () {
                        beforeEach(function () {
                            this.player2.clickCard(this.goldCloaks);
                        });

                        it('should sacrifice Gold Cloaks', function () {
                            expect(this.goldCloaks.location).toBe('discard pile');
                        });
                    });
                });

                describe('and Location is named', function () {
                    beforeEach(function () {
                        this.player1.clickPrompt('Location');
                    });

                    it('should prompt the opponent to sacrifice a location of matching cost', function () {
                        expect(this.player2).toHavePrompt(
                            'Select a location with printed cost ' +
                                this.kingsLanding.getPrintedCost() +
                                ' to sacrifice'
                        );
                    });

                    it('should only allow selecting the matching-cost location, not the matching-cost character', function () {
                        expect(this.player2).toAllowSelect(this.kingsLanding);
                        expect(this.player2).not.toAllowSelect(this.goldCloaks);
                    });
                });
            });
        });
    });
});
