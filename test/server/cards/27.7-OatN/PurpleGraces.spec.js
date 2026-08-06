describe('Purple Graces', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('targaryen', [
                'A Noble Cause',
                'Purple Graces (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'Hedge Knight',
                'The Tickler (Core)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.graces = this.player1.findCardByName('Purple Graces', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');
            this.p2tickler = this.player2.findCardByName('The Tickler', 'hand');

            this.player1.setupCards([this.graces]);
            this.player2.setupCards([this.p2knight, this.p2tickler]);
            this.completeSetup();
            this.selectFirstPlayer(this.player2);
            this.completeMarshalPhase();
        });

        describe('when a military challenge is initiated against player1', function () {
            beforeEach(function () {
                this.player2.initiateChallenge({ type: 'military', attackers: this.p2knight });
            });

            it('should allow triggering the action', function () {
                expect(this.player1).toAllowTriggerAction(this.graces, 'Give an attacker -2 STR');
            });

            describe('when triggered', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.graces, 'Give an attacker -2 STR');
                    this.player1.clickCard(this.p2knight);
                });

                it('should give the attacker -2 STR until the end of the phase', function () {
                    expect(this.p2knight.getStrength()).toBe(this.p2knight.cardData.strength - 2);
                });

                it('should kneel Purple Graces', function () {
                    expect(this.graces.kneeled).toBe(true);
                });

                it('should restore STR at the end of the phase', function () {
                    this.skipActionWindow();
                    this.player1.declareDefenders([]);
                    this.skipActionWindow();
                    this.completeChallengesPhase();
                    expect(this.p2knight.getStrength()).toBe(this.p2knight.cardData.strength);
                });
            });
        });

        describe('when an intrigue challenge is initiated against player1', function () {
            beforeEach(function () {
                this.player2.initiateChallenge({ type: 'intrigue', attackers: this.p2tickler });
            });

            it('should not allow triggering the action', function () {
                expect(this.player1).not.toAllowTriggerAction(
                    this.graces,
                    'Give an attacker -2 STR'
                );
            });
        });

        describe('when no challenge is happening', function () {
            it('should not allow triggering the action', function () {
                expect(this.player1).not.toAllowTriggerAction(
                    this.graces,
                    'Give an attacker -2 STR'
                );
            });
        });
    });
});
