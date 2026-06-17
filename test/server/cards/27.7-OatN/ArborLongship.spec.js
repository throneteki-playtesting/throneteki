// Claude: Arbor Longship (code 27594) - gives solo attacker +2 STR, stands if came from shadows
describe('Arbor Longship', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                'Arbor Longship (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('tyrell', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.longship = this.player1.findCardByName('Arbor Longship', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.clickCard(this.longship);
            this.player1.clickPrompt('Setup');
            this.player2.clickCard(this.p2knight);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);
            this.player1.clickCard(this.knight);
            this.completeMarshalPhase();
        });

        describe('during a challenge with a solo attacker', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                // In defendersDeclared action window
            });

            it('should allow the action on the solo attacker', function () {
                expect(this.player1).toAllowTriggerAction(
                    this.longship,
                    'Give solo character +2 STR'
                );
            });

            describe('when the action is used', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.longship, 'Give solo character +2 STR');
                    this.player1.clickCard(this.knight);
                });

                it('should give the attacker +2 STR', function () {
                    expect(this.knight.getStrength()).toBe(this.knight.cardData.strength + 2);
                });

                it('should kneel Arbor Longship', function () {
                    expect(this.longship.kneeled).toBe(true);
                });
            });
        });

        describe('when Arbor Longship came out of shadows this phase', function () {
            beforeEach(function () {
                this.player1.dragCard(this.longship, 'shadows');
                this.player1Object.gold = 5;
                this.player1.clickCard(this.longship);

                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
            });

            describe('and it buffs a solo attacker', function () {
                beforeEach(function () {
                    this.knight.kneeled = true;
                    this.player1.clickMenu(this.longship, 'Give solo character +2 STR');
                    this.player1.clickCard(this.knight);
                });

                it('should also stand the character', function () {
                    expect(this.knight.kneeled).toBe(false);
                });
            });
        });
    });
});
