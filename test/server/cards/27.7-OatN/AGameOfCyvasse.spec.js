describe('A Game of Cyvasse', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('martell', [
                'A Noble Cause',
                'A Game of Cyvasse (OatN)',
                'Doran Martell (Core)',
                'Ricasso (AMAF)'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Cersei Lannister (Core)',
                'The Tickler (Core)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.cyvasse = this.player1.findCardByName('A Game of Cyvasse', 'hand');
            this.doran = this.player1.findCardByName('Doran Martell', 'hand');
            this.ricasso = this.player1.findCardByName('Ricasso', 'hand');
            this.cersei = this.player2.findCardByName('Cersei Lannister', 'hand');
            this.tickler = this.player2.findCardByName('The Tickler', 'hand');

            this.player1Object.gold = 20;
            this.player2Object.gold = 20;

            // Placed during setup (paid for out of the gold set above) so both
            // players can marshal their characters simultaneously
            this.player1.clickCard(this.doran);
            this.player1.clickCard(this.ricasso);
            this.player2.clickCard(this.cersei);
            this.player2.clickCard(this.tickler);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1Object.gold = 10;
            this.player2Object.gold = 10;
            this.completeMarshalPhase();
        });

        describe('when played as a Challenges Action before initiating the next intrigue challenge', function () {
            beforeEach(function () {
                this.player1.clickCard(this.cyvasse);
            });

            it('should be played from hand', function () {
                expect(this.cyvasse.location).toBe('discard pile');
            });

            describe('and the intrigue challenge is initiated with both eligible characters offered as attackers', function () {
                beforeEach(function () {
                    this.player1.clickPrompt('Intrigue');
                    // Attempt to declare both; the second click should be rejected by the max-1 restriction
                    this.player1.clickCard(this.doran);
                    this.player1.clickCard(this.ricasso);
                    this.player1.clickPrompt('Done');
                    this.skipActionWindow();
                });

                it('should only declare 1 character as an attacker', function () {
                    expect(this.doran.isAttacking()).toBe(true);
                    expect(this.ricasso.isAttacking()).toBe(false);
                });

                describe('and both eligible characters are offered as defenders', function () {
                    beforeEach(function () {
                        // Attempt to declare both; the second click should be rejected by the max-1 restriction
                        this.player2.clickCard(this.cersei);
                        this.player2.clickCard(this.tickler);
                        this.player2.clickPrompt('Done');
                        this.skipActionWindow();
                    });

                    it('should only declare 1 character as a defender', function () {
                        expect(this.cersei.isDefending()).toBe(true);
                        expect(this.tickler.isDefending()).toBe(false);
                    });
                });
            });

            describe('when player1 wins the marked intrigue challenge', function () {
                beforeEach(function () {
                    // Doran attacks unopposed
                    this.player1.initiateChallenge({ type: 'intrigue', attackers: [this.doran] });
                    this.skipActionWindow();
                    this.player2.declareDefenders([]);
                    this.skipActionWindow();
                });

                it('should allow player1 to initiate an additional intrigue challenge this phase', function () {
                    this.player1.clickPrompt('Continue');

                    expect(() =>
                        this.player1.initiateChallenge({
                            type: 'intrigue',
                            attackers: [this.ricasso]
                        })
                    ).not.toThrow();
                });
            });

            describe('when player1 loses the marked intrigue challenge', function () {
                beforeEach(function () {
                    // Ricasso attacks but is defeated by the higher STR Cersei
                    this.player1.initiateChallenge({
                        type: 'intrigue',
                        attackers: [this.ricasso]
                    });
                    this.skipActionWindow();
                    this.player2.declareDefenders([this.cersei]);
                    this.skipActionWindow();
                });

                it('should not allow player1 to initiate an additional intrigue challenge this phase', function () {
                    expect(() =>
                        this.player1.initiateChallenge({
                            type: 'intrigue',
                            attackers: [this.doran]
                        })
                    ).toThrow();
                });
            });
        });
    });
});
