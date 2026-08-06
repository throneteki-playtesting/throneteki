describe('Wormway Sentinels', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                { name: 'Wormway Sentinels (OatN)', count: 2 },
                'Longclaw (Core)'
            ]);
            const deck2 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Wildling Scout (NMG)',
                'Northern Refugee (TC)'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            [this.sentinels, this.shadowSentinels] = this.player1.filterCardsByName(
                'Wormway Sentinels',
                'hand'
            );
            this.longclaw = this.player1.findCardByName('Longclaw', 'hand');
            this.p2scout = this.player2.findCardByName('Wildling Scout', 'hand');
            this.p2refugee = this.player2.findCardByName('Northern Refugee', 'hand');

            this.player2.setupCards([this.p2scout, this.p2refugee]);
        });

        describe('when marshalled normally', function () {
            beforeEach(function () {
                this.completeSetup();
                this.selectFirstPlayer(this.player1);
                this.player1Object.gold = 20;
                this.player1.marshalCards([this.sentinels]);
                this.completeMarshalPhase();
            });

            it('should not be declarable as an attacker in an intrigue challenge', function () {
                const intrigue = this.player1
                    .currentPrompt()
                    .buttons.find((button) => button.text === 'Intrigue');
                expect(intrigue.disabled).toBe(true);
            });

            it('should be declarable as a defender in an intrigue challenge', function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'intrigue', attackers: this.p2scout });
                this.skipActionWindow();
                expect(this.player1).toAllowSelect(this.sentinels);
            });

            it('should be declarable as a defender in a power challenge', function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'power', attackers: this.p2refugee });
                this.skipActionWindow();
                expect(this.player1).toAllowSelect(this.sentinels);
            });

            it('should not be declarable while kneeling', function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'intrigue', attackers: this.p2scout });
                this.skipActionWindow();
                this.player1.declareDefenders([this.sentinels]);
                this.skipActionWindow();
                expect(this.sentinels.kneeled).toBe(true);

                this.player2.initiateChallenge({ type: 'power', attackers: this.p2refugee });
                this.skipActionWindow();
                expect(this.player1).not.toAllowSelect(this.sentinels);
            });
        });

        describe('when it came out of shadows this phase', function () {
            beforeEach(function () {
                this.completeSetup();
                this.selectFirstPlayer(this.player1);
                this.completeMarshalPhase();
                this.player1.dragCard(this.shadowSentinels, 'shadows');

                this.player1Object.gold = 20;
                this.player1.clickCard(this.shadowSentinels);
                this.player1.passChallenge();
            });

            it('should have come into play out of shadows', function () {
                expect(this.shadowSentinels.location).toBe('play area');
            });

            it('should be declarable as a defender while kneeling', function () {
                this.player2.initiateChallenge({ type: 'intrigue', attackers: this.p2scout });
                this.skipActionWindow();
                this.player1.declareDefenders([this.shadowSentinels]);
                this.skipActionWindow();
                expect(this.shadowSentinels.kneeled).toBe(true);

                this.player2.initiateChallenge({ type: 'power', attackers: this.p2refugee });
                this.skipActionWindow();
                expect(this.player1).toAllowSelect(this.shadowSentinels);
            });
        });

        describe('attachment restrictions', function () {
            beforeEach(function () {
                this.completeSetup();
                this.selectFirstPlayer(this.player1);
                this.player1Object.gold = 20;
                this.player1.marshalCards([this.sentinels]);
            });

            it('should allow a Weapon attachment', function () {
                this.player1.attachCard(this.longclaw, this.sentinels);
                expect(this.longclaw.parent).toBe(this.sentinels);
            });
        });
    });
});
