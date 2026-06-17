// Claude: fixed challenge flow, skipActionWindow, corrected Nightmares prompt title
describe('Dragonglass Mine', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Dragonglass Mine (OatN)',
                'Hedge Knight',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Hedge Knight',
                'Nightmares'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.mine = this.player1.findCardByName('Dragonglass Mine', 'hand');
            [this.knight1, this.knight2] = this.player1.filterCardsByName('Hedge Knight', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');
            this.nightmares = this.player2.findCardByName('Nightmares', 'hand');

            this.player1.clickCard(this.mine);
            this.player1.clickCard(this.knight1);
            this.player2.clickCard(this.p2knight);
            this.completeSetup();

            this.player1Object.faction.power = 5;
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when the mine action is used during a challenge', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.knight1);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
            });

            it('should allow targeting any character you control', function () {
                this.player1.clickMenu(this.mine, 'Grant Immunity');
                expect(this.player1).toAllowSelect(this.knight1);
            });

            describe('after granting immunity', function () {
                beforeEach(function () {
                    this.player1.clickMenu(this.mine, 'Grant Immunity');
                    this.player1.clickCard(this.knight1);
                });

                it('should make the character immune to opponent character abilities until end of phase', function () {
                    expect(this.player1).not.toAllowTriggerAction(
                        this.nightmares,
                        'Blank a character or location'
                    );
                });
            });
        });

        describe('when player has less than 5 power on faction', function () {
            beforeEach(function () {
                this.player1Object.faction.power = 4;
            });

            it('should not allow the action', function () {
                expect(this.player1).not.toAllowTriggerAction(this.mine, 'Grant Immunity');
            });
        });
    });
});
