describe('Skirling Pass', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('thenightswatch', [
                'A Noble Cause',
                'Skirling Pass (OatN)',
                { name: 'Shadowskin Cloak (OatN)', count: 2 },
                'Hedge Knight',
                'Wildling Bandit (LoCR)'
            ]);
            const deck2 = this.buildDeck('thenightswatch', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.pass = this.player1.findCardByName('Skirling Pass', 'hand');
            this.knight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.bandit = this.player1.findCardByName('Wildling Bandit', 'hand');
            [this.cloak1, this.cloak2] = this.player1.filterCardsByName('Shadowskin Cloak', 'hand');
            this.p2knight = this.player2.findCardByName('Hedge Knight', 'hand');

            this.player1.setupCards([this.knight]);
            this.player2.setupCards([this.p2knight]);
            this.completeSetup();
            this.selectFirstPlayer(this.player1);

            this.player1Object.gold = 20;
            this.player1.marshalCards([this.pass, this.bandit]);
            for (const [cloak, target] of [
                [this.cloak1, this.knight],
                [this.cloak2, this.bandit]
            ]) {
                this.player1.clickCard(cloak);
                this.player1.clickPrompt('Marshal');
                this.player1.clickCard(target);
            }
        });

        it('should remove stealth from non-Wildling characters', function () {
            expect(this.knight.hasKeyword('stealth')).toBe(false);
        });

        it('should not remove stealth from Wildling characters', function () {
            expect(this.bandit.hasKeyword('stealth')).toBe(true);
        });

        describe('while Skirling Pass is kneeling', function () {
            beforeEach(function () {
                this.pass.kneeled = true;
                this.game.refreshGameState();
                this.game.continue();
            });

            it('should no longer remove stealth', function () {
                expect(this.knight.hasKeyword('stealth')).toBe(true);
            });
        });
    });
});
