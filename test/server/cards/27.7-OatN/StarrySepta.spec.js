// Claude: redesigned using TtB Hound's forcedReaction instead of non-existent Core Hound action
describe('Starry Septa', function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('tyrell', [
                'A Noble Cause',
                'Starry Septa (OatN)',
                'Hedge Knight'
            ]);
            const deck2 = this.buildDeck('lannister', [
                'A Noble Cause',
                'The Hound (TtB)',
                'Hedge Knight'
            ]);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.septa = this.player1.findCardByName('Starry Septa', 'hand');
            this.hound = this.player2.findCardByName('The Hound', 'hand');

            this.player1.clickCard(this.septa);
            this.player2.clickCard(this.hound);
            this.completeSetup();

            this.septa.modifyPower(3);
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();
        });

        describe('when an opponent wins a challenge with a forced reaction character', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Done');
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.hound);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
                // afterChallenge → The Hound's forced reaction fires → onCardAbilityInitiated → Septa interrupt window
            });

            it('should allow cancelling by discarding 1 power from Starry Septa', function () {
                expect(this.player1).toAllowAbilityTrigger('Starry Septa');
            });

            describe('when the interrupt triggers', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.septa);
                });

                it('should discard 1 power from Starry Septa', function () {
                    expect(this.septa.getPower()).toBe(2);
                });

                it('should cancel the hound ability', function () {
                    expect(this.hound.location).toBe('play area');
                });
            });
        });

        describe('when Starry Septa has no power', function () {
            beforeEach(function () {
                this.septa.modifyPower(-3);
                this.player1.clickPrompt('Done');
                this.player2.clickPrompt('Military');
                this.player2.clickCard(this.hound);
                this.player2.clickPrompt('Done');
                this.skipActionWindow();
                this.player1.clickPrompt('Done');
                this.skipActionWindow();
            });

            it('should not allow the interrupt', function () {
                expect(this.player1).not.toAllowAbilityTrigger('Starry Septa');
            });
        });
    });
});
