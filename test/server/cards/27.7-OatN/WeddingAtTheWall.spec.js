describe('Wedding at the Wall', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Wedding at the Wall (OatN)',
                'Acolyte of the Flame (FotS)',
                'Northern Refugee (TC)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Northern Refugee (TC)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.wedding = this.player1.findCardByName('Wedding at the Wall', 'hand');
            this.acolyte = this.player1.findCardByName('Acolyte of the Flame', 'hand');
            this.refugee = this.player1.findCardByName('Northern Refugee', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2refugee = this.player2.findCardByName('Northern Refugee', 'hand');

            this.player1.setupCards([this.acolyte, this.refugee, this.knight]);
            this.player2.setupCards([this.p2refugee]);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('after winning a power challenge as the attacking player', function () {
            beforeEach(function () {
                this.player1.initiateChallenge({
                    type: 'power',
                    attackers: [this.acolyte, this.refugee]
                });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Wedding at the Wall');
            });

            describe('when the reaction is triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.wedding);
                });

                it("should only allow selecting kneeling R'hllor or Wildling characters", function () {
                    expect(this.player1).toAllowSelect(this.acolyte);
                    expect(this.player1).toAllowSelect(this.refugee);
                    expect(this.player1).not.toAllowSelect(this.knight);
                });

                describe('and 2 characters are chosen', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.acolyte);
                        this.player1.clickCard(this.refugee);
                        this.player1.clickPrompt('Done');
                    });

                    it('should stand both chosen characters', function () {
                        expect(this.acolyte.kneeled).toBe(false);
                        expect(this.refugee.kneeled).toBe(false);
                    });

                    it('should put the event in the discard pile', function () {
                        expect(this.wedding.location).toBe('discard pile');
                    });
                });
            });
        });

        describe('when only one valid character could be stood', function () {
            beforeEach(function () {
                this.player1.dragCard(this.refugee, 'discard pile');
                this.player1.initiateChallenge({ type: 'power', attackers: [this.acolyte] });
                this.skipActionWindow();
                this.player2.declareDefenders([]);
                this.skipActionWindow();
            });

            it('should not allow triggering the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Wedding at the Wall');
            });
        });

        describe('after winning a power challenge as the defending player', function () {
            beforeEach(function () {
                this.player1.passChallenge();
                this.player2.initiateChallenge({ type: 'power', attackers: [this.p2refugee] });
                this.skipActionWindow();
                this.player1.declareDefenders([this.acolyte, this.refugee]);
                this.skipActionWindow();
            });

            it('should not allow triggering the reaction', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Wedding at the Wall');
            });
        });
    });
});
