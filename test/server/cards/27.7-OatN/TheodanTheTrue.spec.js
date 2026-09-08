describe('Theodan the True', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('stark', [
                'A Noble Cause',
                'Theodan the True (OatN)',
                'Catelyn Stark (Core)',
                'The Seven-Pointed Star (SAT)',
                'Little Bird (Core)'
            ]);
            const deck2 = this.buildDeck('targaryen', [
                'A Noble Cause',
                { name: 'Hedge Knight', count: 3 }
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();
            this.completeSetup();
            this.selectFirstPlayer(this.player1);

            this.theodan = this.player1.findCardByName('Theodan the True', 'hand');
            this.catelyn = this.player1.findCardByName('Catelyn Stark (Core)', 'hand');
            this.star = this.player1.findCardByName('The Seven-Pointed Star', 'hand');
            this.littleBird = this.player1.findCardByName('Little Bird', 'hand');
            [this.hedgeKnight1, this.hedgeKnight2, this.hedgeKnight3] =
                this.player2.filterCardsByName('Hedge Knight', 'hand');

            this.player1Object.gold = 20;
            this.player2Object.gold = 20;

            this.player1.clickCard(this.theodan);
            this.player1.clickCard(this.catelyn);
        });

        describe('attachment restrictions', function () {
            describe('when attaching a card without The Seven trait', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.littleBird);
                });

                it('should not allow attaching to Theodan', function () {
                    expect(this.player1).not.toAllowSelect(this.theodan);
                });
            });

            describe('when attaching a The Seven card', function () {
                beforeEach(function () {
                    this.player1.clickCard(this.star);
                });

                it('should allow attaching to Theodan', function () {
                    expect(this.player1).toAllowSelect(this.theodan);
                });
            });
        });

        describe('once marshaling is complete', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Done');

                this.player2.clickCard(this.hedgeKnight1);
                this.player2.clickCard(this.hedgeKnight2);
                this.player2.clickCard(this.hedgeKnight3);
                this.player2.clickPrompt('Done');
            });

            describe('when Theodan wins a challenge in which he is participating', function () {
                beforeEach(function () {
                    this.unopposedChallenge(this.player1, 'military', this.theodan);
                });

                it('should allow the reaction to trigger', function () {
                    expect(this.player1).toAllowAbilityTrigger(this.theodan);
                });

                describe('when triggered', function () {
                    beforeEach(function () {
                        this.player1.triggerAbility(this.theodan);
                    });

                    it('should only allow choosing a The Seven character', function () {
                        expect(this.player1).toAllowSelect(this.catelyn);
                    });

                    describe('and Catelyn Stark is chosen', function () {
                        beforeEach(function () {
                            this.player1.clickCard(this.catelyn);
                        });

                        it('should prompt to choose renown or insight', function () {
                            expect(this.player1).toHavePromptButton('Renown');
                            expect(this.player1).toHavePromptButton('Insight');
                        });

                        describe('and Renown is chosen', function () {
                            beforeEach(function () {
                                this.player1.clickPrompt('Renown');
                            });

                            it('should give Catelyn Stark renown', function () {
                                expect(this.catelyn.hasKeyword('renown')).toBe(true);
                            });
                        });

                        describe('and Insight is chosen', function () {
                            beforeEach(function () {
                                this.player1.clickPrompt('Insight');
                            });

                            it('should give Catelyn Stark insight', function () {
                                expect(this.catelyn.hasKeyword('insight')).toBe(true);
                            });
                        });
                    });
                });
            });

            describe('when Theodan wins 2 challenges of different types in which he is participating', function () {
                beforeEach(function () {
                    // Player1 passes their own challenge initiation so player2 can initiate
                    this.player1.clickPrompt('Done');

                    this.player2.initiateChallenge({
                        type: 'military',
                        attackers: [this.hedgeKnight1]
                    });
                    this.skipActionWindow();
                    this.player1.declareDefenders([this.theodan]);
                    this.skipActionWindow();

                    this.player1.triggerAbility(this.theodan);
                    this.player1.clickCard(this.catelyn);
                    this.player1.clickPrompt('Renown');

                    // Theodan kneeled from defending the first challenge; stand him so he can defend again
                    this.theodan.kneeled = false;

                    this.player2.initiateChallenge({
                        type: 'power',
                        attackers: [this.hedgeKnight2]
                    });
                    this.skipActionWindow();
                    this.player1.declareDefenders([this.theodan]);
                    this.skipActionWindow();
                });

                it('should allow the reaction to trigger a second time this phase', function () {
                    expect(this.player1).toAllowAbilityTrigger(this.theodan);
                });

                describe('when triggered a second time', function () {
                    beforeEach(function () {
                        this.player1.triggerAbility(this.theodan);
                        this.player1.clickCard(this.catelyn);
                        this.player1.clickPrompt('Insight');
                    });

                    it('should give Catelyn Stark insight as well', function () {
                        expect(this.catelyn.hasKeyword('insight')).toBe(true);
                    });
                });
            });
        });
    });
});
