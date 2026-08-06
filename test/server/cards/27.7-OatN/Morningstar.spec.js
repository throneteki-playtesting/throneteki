describe('Morningstar', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                'Morningstar (OatN)',
                'Ser Colen of Greenpools (AtSK)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('tyrell', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.morningstar = this.player1.findCardByName('Morningstar', 'hand');
            this.colen = this.player1.findCardByName('Ser Colen of Greenpools', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.colen, this.knight]);
            this.player2.setupCards([this.p2knight]);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);

            this.player1.attachCard(this.morningstar, this.colen);
            this.completeMarshalPhase();
        });

        describe('after winning a military challenge with the attached character', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'military', attackers: [this.colen] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Morningstar');
            });

            describe('when the reaction triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.morningstar);
                });

                it('should kneel Morningstar', function () {
                    expect(this.morningstar.kneeled).toBe(true);
                });

                it('should stand the attached character', function () {
                    expect(this.colen.kneeled).toBe(false);
                });

                it('should remove the attached character from the challenge', function () {
                    expect(this.colen.isParticipating()).toBe(false);
                });
            });
        });

        describe('after winning a power challenge with the attached character', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'power', attackers: [this.colen] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should not allow the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Morningstar');
            });
        });

        describe('when the attached character is not participating', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'military', attackers: [this.knight] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should not allow the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Morningstar');
            });
        });
    });
});
