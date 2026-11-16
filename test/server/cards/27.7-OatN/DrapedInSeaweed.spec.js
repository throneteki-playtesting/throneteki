describe('Draped in Seaweed', function () {
    describe('attachment restriction', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    faction: 'greyjoy',
                    hand: ['Draped in Seaweed'],
                    inPlay: ['Aeron Damphair (Core)', 'House Maester'],
                    gold: 5
                },
                player2: {}
            });
            this.player1.clickCard(this.drapedInSeaweed);
        });

        it('can only be attached to Drowned God characters', function () {
            expect(this.player1).toBeAbleToSelect(this.aeronDamphair);
            expect(this.player1).not.toBeAbleToSelect(this.houseMaester);
        });
    });

    describe('when a character you control is killed', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    inPlay: [
                        { card: 'Aeron Damphair (Core)', attachments: ['Draped in Seaweed'] },
                        'House Maester'
                    ]
                },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
            this.aeron = this.aeronDamphair;
            this.attacker = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player2.clickPrompt('Military');
            this.player2.clickCard(this.attacker);
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickCard(this.houseMaester);
        });

        it('kills the attached character to save it', function () {
            expect(this.player1).toAllowAbilityTrigger(this.drapedInSeaweed);
            this.player1.triggerAbility(this.drapedInSeaweed);

            expect(this.aeron.location).toBe('dead pile');
            expect(this.drapedInSeaweed.location).not.toBe('play area');
            expect(this.houseMaester.location).toBe('play area');
            expect(this.player2).isReadyToTakeAction();
        });

        it('can be declined', function () {
            this.player1.clickPrompt('Pass');

            expect(this.houseMaester.location).toBe('dead pile');
            expect(this.aeron.location).toBe('play area');
        });
    });
});
