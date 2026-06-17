// Claude: fixed challenge flow; player2 passes manually before completeChallengesPhase; use completeRound for standing check
describe('Northern Mountain Clans', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Northern Mountain Clans (OatN)',
                'Hedge Knight',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('baratheon', [
                'A Noble Cause',
                'Hedge Knight',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.clans = this.player1.findCardByName('Northern Mountain Clans', 'hand');
            [this.knight1, this.knight2] = this.player1.filterCardsByName('Hedge Knight', 'hand');
            [this.p2knight1, this.p2knight2] = this.player2.filterCardsByName(
                'Hedge Knight',
                'hand'
            );

            this.player1.clickCard(this.clans);
            this.player2.clickCard(this.p2knight1);
            this.player2.clickCard(this.p2knight2);
            this.completeSetup();

            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.p2knight1.kneeled = true;
            this.p2knight2.kneeled = true;
        });

        describe('after winning a challenge as attacker', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Military');
                this.player1.clickCard(this.clans);
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
            });

            it('should trigger the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger('Northern Mountain Clans');
            });

            describe('when the reaction is triggered', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.clans);
                });

                it('should prompt to choose kneeling characters equal to claim value', function () {
                    expect(this.player1).toHavePrompt('Select 1 character');
                });

                it('should only allow selecting kneeling characters', function () {
                    expect(this.player1).toAllowSelect(this.p2knight1);
                    expect(this.player1).toAllowSelect(this.p2knight2);
                });

                describe('after selecting a character', function () {
                    beforeEach(function () {
                        this.player1.clickCard(this.p2knight1);
                        this.player1.clickPrompt('Done');
                        this.player1.clickPrompt('Apply Claim');
                        this.player2.clickCard(this.p2knight2);
                    });

                    it('should prevent the selected character from standing during the standing phase', function () {
                        // player1 passes first (attacker/first player), then player2
                        this.player1.clickPrompt('Done');
                        this.player2.clickPrompt('Done');
                        this.completeRound();
                        expect(this.p2knight1.kneeled).toBe(true);
                    });
                });
            });
        });
    });
});
