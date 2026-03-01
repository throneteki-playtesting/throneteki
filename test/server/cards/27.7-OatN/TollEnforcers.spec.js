// Generated with Claude Code - claude-opus-4-6-20250605
// - 2026-02-01: Created spec for Toll Enforcers
// - 2026-02-05: Fixed gold token check and challenge cancel assertion

describe('Toll Enforcers', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Toll Enforcers',
                'The Roseroad'
            ]);
            const deck2 = this.buildDeck('stark', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.tollEnforcers = this.player1.findCardByName('Toll Enforcers', 'hand');
            this.roseroad = this.player1.findCardByName('The Roseroad', 'hand');
            this.knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.tollEnforcers, this.roseroad]);
            this.player2.setupCards(this.knight);

            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.completeMarshalPhase();
        });

        describe('renown based on gold', function () {
            it('should not have renown with less than 2 gold', function () {
                expect(this.tollEnforcers.hasKeyword('renown')).toBe(false);
            });

            it('should have renown with 2 or more gold', function () {
                this.tollEnforcers.modifyGold(2);
                this.game.refreshGameState();
                this.game.continue();
                expect(this.tollEnforcers.hasKeyword('renown')).toBe(true);
            });
        });

        describe('when an opponent initiates a challenge', function () {
            beforeEach(function () {
                this.player2.initiateChallenge({ type: 'military', attackers: this.knight });
            });

            it('should allow the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger(this.tollEnforcers);
            });

            describe('when the reaction is triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.tollEnforcers);
                });

                it('should prompt to select a card to receive gold', function () {
                    expect(this.player1).toHavePrompt('Select a card to receive the gold');
                });

                describe('when a card is selected', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.tollEnforcers);
                    });

                    it('should give opponent the choice to pay or end challenge', function () {
                        expect(this.player2).toHavePrompt(
                            'Move 1 gold to Toll Enforcers or end the challenge?'
                        );
                    });

                    describe('when opponent chooses to move gold', function () {
                        beforeEach(function () {
                            this.initialGold = this.player2Object.gold;
                            this.player2.clickPrompt('Move 1 gold');
                        });

                        it('should move 1 gold from opponent to the selected card', function () {
                            expect(this.player2Object.gold).toBe(this.initialGold - 1);
                            expect(this.tollEnforcers.gold).toBe(1);
                        });

                        it('should continue the challenge', function () {
                            expect(this.game.currentChallenge).toBeDefined();
                        });
                    });

                    describe('when opponent chooses to end challenge', function () {
                        beforeEach(function () {
                            this.player2.clickPrompt('End challenge');
                        });

                        it('should end the challenge with no winner', function () {
                            expect(this.game.currentChallenge).toBeNull();
                        });
                    });
                });
            });
        });
    });
});
