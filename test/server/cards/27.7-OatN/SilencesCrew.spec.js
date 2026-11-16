describe("Silence's Crew", function () {
    function setup(context, firstPlayer) {
        context.setupTest({
            phase: 'marshal',
            firstPlayer,
            player1: {
                shadows: ["Silence's Crew (OatN)"],
                inPlay: [
                    { card: "Black Wind's Crew", kneeling: true },
                    { card: 'House Maester', kneeling: true }
                ],
                gold: 5
            },
            player2: { inPlay: [{ card: "Black Wind's Crew", kneeling: true }] }
        });
        context.crew = context.player1.findCardByName("Silence's Crew", 'shadows');
        context.pillager = context.player1.findCardByName("Black Wind's Crew", 'play area');
        context.maester = context.player1.findCardByName('House Maester', 'play area');
        context.opponentPillager = context.player2.findCardByName("Black Wind's Crew", 'play area');
    }

    describe('when you are the first player', function () {
        beforeEach(function () {
            setup(this, 'player1');
            this.player1.clickCard(this.crew);
        });

        it('stands each character you control with pillage', function () {
            expect(this.player1).toAllowAbilityTrigger(this.crew);
            this.player1.triggerAbility(this.crew);

            expect(this.pillager.kneeled).toBe(false);
            expect(this.crew.kneeled).toBe(false);
            expect(this.maester.kneeled).toBe(true);
            expect(this.opponentPillager.kneeled).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when you are not the first player', function () {
        beforeEach(function () {
            setup(this, 'player2');
            this.player2.clickPrompt('Done');
            this.player1.clickCard(this.crew);
        });

        it('is not offered', function () {
            expect(this.crew.location).toBe('play area');
            expect(this.player1).not.toAllowAbilityTrigger(this.crew);
            expect(this.pillager.kneeled).toBe(true);
        });
    });
});
