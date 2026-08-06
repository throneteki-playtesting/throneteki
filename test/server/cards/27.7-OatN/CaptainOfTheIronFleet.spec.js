describe('Captain of the Iron Fleet', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                'Captain of the Iron Fleet (OatN)',
                'Victarion Greyjoy (R)',
                'The Balerion (AHaH)'
            ]);
            const deck2 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                'Hedge Knight',
                'Northern Refugee (TC)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.captain = this.player1.findCardByName('Captain of the Iron Fleet', 'hand');
            this.victarion = this.player1.findCardByName('Victarion Greyjoy', 'hand');
            this.balerion = this.player1.findCardByName('The Balerion', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');
            this.p2refugee = this.player2.findCardByName('Northern Refugee', 'hand');

            this.player1.setupCards([this.victarion, this.balerion]);
            this.player2.setupCards([this.p2knight, this.p2refugee]);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player1.attachCard(this.captain, this.victarion);
            this.completeMarshalPhase();
        });

        it('should give Victarion the Captain trait via whileAttached', function () {
            expect(this.victarion.hasTrait('Captain')).toBe(true);
        });

        describe('during a military challenge', function () {
            beforeEach(function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'military', attackers: this.p2knight });
                this.skipActionWindow();
                this.player1.declareDefenders([]);
            });

            it('should allow triggering the action', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.captain,
                    'Contribute STR to challenge'
                );
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.captain, 'Contribute STR to challenge');
                    this.player1.clickCard(this.balerion);
                });

                it('should kneel the Captain and the Warship', function () {
                    expect(this.captain.kneeled).toBe(true);
                    expect(this.balerion.kneeled).toBe(true);
                });

                it('should not add Victarion to the challenge', function () {
                    expect(this.victarion.isParticipating()).toBe(false);
                });

                it("should contribute Victarion's STR to player1's side", function () {
                    expect(this.game.currentChallenge.defenderStrength).toBe(
                        this.victarion.getStrength()
                    );
                });
            });
        });

        describe('during an intrigue challenge', function () {
            beforeEach(function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'intrigue', attackers: this.p2refugee });
            });

            it('should not allow triggering the action', function () {
                expect(this.player1).not.toAllowTriggerAction(
                    this.captain,
                    'Contribute STR to challenge'
                );
            });
        });
    });
});
