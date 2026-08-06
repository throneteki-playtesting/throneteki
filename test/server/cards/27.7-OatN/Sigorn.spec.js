describe('Sigorn', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Sigorn (OatN)',
                'Alys Karstark (OatN)',
                "Rattleshirt's Raiders (Core)",
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                { name: 'Hedge Knight', count: 2 }
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.sigorn = this.player1.findCardByName('Sigorn', 'hand');
            this.alys = this.player1.findCardByName('Alys Karstark', 'hand');
            this.raiders = this.player1.findCardByName("Rattleshirt's Raiders", 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            [this.p2knight] = this.player2.filterCardsByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.sigorn, this.knight]);
            this.player2.setupCards([this.p2knight]);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);

            this.player1Object.gold = 20;
            this.player1.marshalCards([this.alys, this.raiders]);
            this.completeMarshalPhase();
        });

        describe('after winning a military challenge in which Sigorn is attacking', function () {
            beforeEach(function () {
                // Kneel Alys by having her attack in an earlier intrigue challenge
                this.player1.initiateChallenge({ type: 'intrigue', attackers: [this.alys] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
                this.player1.skipClaim();

                this.player1.initiateChallenge({
                    type: 'military',
                    attackers: [this.sigorn, this.raiders]
                });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Sigorn');
            });

            describe('when a Wildling other than Alys Karstark is chosen', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.sigorn);
                    this.player1.clickCard(this.raiders);
                });

                it('should stand the chosen character', function () {
                    expect(this.raiders.kneeled).toBe(false);
                });

                it('should leave Sigorn kneeling', function () {
                    expect(this.sigorn.kneeled).toBe(true);
                });
            });

            describe('when Alys Karstark is chosen', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.sigorn);
                    this.player1.clickCard(this.alys);
                });

                it('should stand Alys Karstark', function () {
                    expect(this.alys.kneeled).toBe(false);
                });

                it('should also stand Sigorn', function () {
                    expect(this.sigorn.kneeled).toBe(false);
                });
            });
        });

        describe('after winning a military challenge in which Sigorn is defending', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'intrigue', attackers: [this.alys] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
                this.player1.skipClaim();
                this.player1.passChallenge();

                this.player2.initiateChallenge({ type: 'military', attackers: [this.p2knight] });
                this.skipActionWindow();
                this.player1.declareDefenders([this.sigorn]);
                this.skipActionWindow();
            });

            it('should not allow triggering the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Sigorn');
            });
        });

        describe('after winning a power challenge in which Sigorn is attacking', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({ type: 'intrigue', attackers: [this.alys] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
                this.player1.skipClaim();

                this.player1.initiateChallenge({ type: 'power', attackers: [this.sigorn] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should not allow triggering the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Sigorn');
            });
        });
    });
});
