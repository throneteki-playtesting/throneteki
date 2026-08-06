describe('Jeweled Tiara', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Jeweled Tiara (OatN)',
                'Cersei Lannister (Core)',
                'Tywin Lannister (Core)'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'The Tickler (Core)',
                { name: 'Hedge Knight', count: 5 }
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.tiara = this.player1.findCardByName('Jeweled Tiara', 'hand');
            this.cersei = this.player1.findCardByName('Cersei Lannister', 'hand');
            this.tywin = this.player1.findCardByName('Tywin Lannister', 'hand');
            this.p2tickler = this.player2.findCardByName('The Tickler', 'hand');

            this.player1.setupCards([this.cersei]);
            this.player2.setupCards([this.p2tickler]);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);

            this.player1Object.gold = 20;
            this.player1.attachCard(this.tiara, this.cersei);
            this.player1.marshalCards([this.tywin]);
            this.completeMarshalPhase();

            this.p2HandSize = this.player2.handSize;
        });

        it('should give the attached character the Queen trait', function () {
            expect(this.cersei.hasTrait('Queen')).toBe(true);
        });

        describe('after winning an intrigue challenge in which it is attacking', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'intrigue', attackers: [this.cersei] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Jeweled Tiara');
            });
        });

        describe('after winning an intrigue challenge by less than 10 STR while defending', function () {
            beforeEach(function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'intrigue', attackers: [this.p2tickler] });
                this.skipActionWindow();
                this.player1.declareDefenders([this.cersei]);
                this.skipActionWindow();
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Jeweled Tiara');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.tiara);
                });

                it('should kneel the Tiara', function () {
                    expect(this.tiara.kneeled).toBe(true);
                });

                it("should discard 1 card from the losing opponent's hand", function () {
                    expect(this.player2.handSize).toBe(this.p2HandSize - 1);
                });
            });
        });

        describe('after winning an intrigue challenge by 10 or more STR while defending', function () {
            beforeEach(function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'intrigue', attackers: [this.p2tickler] });
                this.skipActionWindow();
                this.player1.declareDefenders([this.cersei, this.tywin]);
                this.skipActionWindow();
                this.player1.triggerAbility(this.tiara);
                this.player2.clickPrompt('Done');
            });

            it("should discard 3 cards from the losing opponent's hand", function () {
                expect(this.player2.handSize).toBe(this.p2HandSize - 3);
            });
        });

        describe('when the attached character is not participating', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'intrigue', attackers: [this.tywin] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should not allow triggering the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Jeweled Tiara');
            });
        });

        describe('after winning a power challenge in which it is participating', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'power', attackers: [this.cersei] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should not allow triggering the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Jeweled Tiara');
            });
        });
    });
});
