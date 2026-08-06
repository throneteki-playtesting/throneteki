describe('Into the Lists', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'Into the Lists (OatN)',
                'A Noble Cause',
                'Hedge Knight',
                'Thenns (FtR)',
                'Wildling Scout (NMG)'
            ]);
            const deck2 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Into the Lists (OatN)',
                'Wildling Bandit (LoCR)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            // Hedge Knight: 2 STR, military. Thenns: 3 STR, military, Army.
            // Wildling Scout: 2 STR, intrigue only. Wildling Bandit: 1 STR, military.
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.thenns = this.player1.findCardByName('Thenns', 'hand');
            this.scout = this.player1.findCardByName('Wildling Scout', 'hand');
            this.p2bandit = this.player2.findCardByName('Wildling Bandit', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.knight, this.thenns, this.scout]);
            this.player2.setupCards([this.p2bandit, this.p2knight]);
            this.completeSetup();

            this.player1.selectPlot('Into the Lists');
            this.player2.selectPlot('A Noble Cause');
            this.selectFirstPlayer(this.player1);
        });

        it('should only allow non-Army characters with a military icon to be chosen', function () {
            expect(this.player1).toAllowSelect(this.knight);
            expect(this.player1).not.toAllowSelect(this.thenns);
            expect(this.player1).not.toAllowSelect(this.scout);
        });

        describe('when one knelt character has the highest STR', function () {
            beforeEach(function () {
                this.player1.clickCard(this.knight);
                this.player2.clickCard(this.p2bandit);
            });

            it('should kneel the chosen characters', function () {
                expect(this.knight.kneeled).toBe(true);
                expect(this.p2bandit.kneeled).toBe(true);
            });

            it('should give 2 power to the highest STR character', function () {
                expect(this.knight.getPower()).toBe(2);
                expect(this.p2bandit.getPower()).toBe(0);
            });
        });

        describe('when two knelt characters tie for the highest STR', function () {
            beforeEach(function () {
                this.player1.clickCard(this.knight);
                this.player2.clickCard(this.p2knight);
            });

            it('should kneel both characters', function () {
                expect(this.knight.kneeled).toBe(true);
                expect(this.p2knight.kneeled).toBe(true);
            });

            it('should not give out any power', function () {
                expect(this.knight.getPower()).toBe(0);
                expect(this.p2knight.getPower()).toBe(0);
            });
        });

        describe('when a player declines to choose', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Done');
                this.player2.clickCard(this.p2bandit);
            });

            it('should not kneel that player’s characters', function () {
                expect(this.knight.kneeled).toBe(false);
            });

            it('should give 2 power to the only knelt character', function () {
                expect(this.p2bandit.getPower()).toBe(2);
            });
        });

        describe('when no players choose', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Done');
                this.player2.clickPrompt('Done');
            });

            it('should not give out any power', function () {
                expect(this.knight.getPower()).toBe(0);
                expect(this.p2bandit.getPower()).toBe(0);
            });
        });
    });
});
