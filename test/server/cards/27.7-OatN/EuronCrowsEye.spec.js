describe("Euron Crow's Eye", function () {
    integration(function () {
        beforeEach(function () {
            const deck1 = this.buildDeck('greyjoy', [
                'A Noble Cause',
                "Euron Crow's Eye (OatN)",
                "Hagen's Daughter",
                'Iron Islands Market'
            ]);
            const deck2 = this.buildDeck('greyjoy', ['A Noble Cause', 'Hedge Knight']);
            this.player1.selectDeck(deck1);
            this.player2.selectDeck(deck2);
            this.startGame();
            this.keepStartingHands();

            this.euron = this.player1.findCardByName("Euron Crow's Eye", 'hand');
            this.hagensdaughter = this.player1.findCardByName("Hagen's Daughter", 'hand');
            this.location = this.player1.findCardByName('Iron Islands Market', 'hand');

            this.player1.clickCard(this.location);
            this.completeSetup();
            this.player1.dragCard(this.euron, 'play area');
            this.selectFirstPlayer(this.player1);
            this.completeMarshalPhase();

            this.player1.dragCard(this.hagensdaughter, 'shadows');
            this.player1Object.gold = 5;
            this.player1.clickCard(this.hagensdaughter);
        });

        describe('when a friendly card comes out of shadows', function () {
            it('should allow triggering the reaction', function () {
                expect(this.player1).toAllowAbilityTrigger("Euron Crow's Eye");
            });

            describe('when a location with printed cost above initiative is chosen', function () {
                beforeEach(function () {
                    this.player1.triggerAbility(this.euron);
                    this.player1.clickCard(this.location);
                });

                it('should offer to kneel or stand', function () {
                    expect(this.player1).toHavePromptButton('Kneel');
                    expect(this.player1).toHavePromptButton('Stand');
                });

                it('should kneel the location when Kneel is chosen', function () {
                    this.player1.clickPrompt('Kneel');
                    expect(this.location.kneeled).toBe(true);
                });

                it('should stand the location when Stand is chosen', function () {
                    this.location.kneeled = true;
                    this.player1.clickPrompt('Stand');
                    expect(this.location.kneeled).toBe(false);
                });
            });
        });
    });
});
