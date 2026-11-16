describe('Tourney Steed', function () {
    describe('STR bonus', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [
                        { card: 'Tumblestone Knight', attachments: ['Tourney Steed'] },
                        'Bastard in Hiding'
                    ]
                },
                player2: {
                    inPlay: [
                        { card: 'Tumblestone Knight', attachments: ['Tourney Steed'] },
                        'Bastard in Hiding'
                    ]
                }
            });
            this.knight = this.player1.findCardByName('Tumblestone Knight', 'play area');
            this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.opponentKnight = this.player2.findCardByName('Tumblestone Knight', 'play area');
            this.opponentBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
        });

        it('gives +1 STR outside a challenge', function () {
            expect(this.knight.getStrength()).toBe(3);
            expect(this.bastard.getStrength()).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });

        it('gives +1 STR when attacking with another character', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.knight);
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');

            expect(this.knight.getStrength()).toBe(3);
            expect(this.player1).isReadyToTakeAction();
        });

        it('gives +3 STR when attacking alone, and +3 STR to a lone defender', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.knight);
            this.player1.clickPrompt('Done');

            expect(this.knight.getStrength()).toBe(5);
            expect(this.opponentKnight.getStrength()).toBe(3);

            this.skipActionWindow();
            this.player2.clickCard(this.opponentKnight);
            this.player2.clickPrompt('Done');

            expect(this.opponentKnight.getStrength()).toBe(5);
            expect(this.opponentBastard.getStrength()).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });

        it('gives +1 STR to a defender that is not defending alone', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.knight);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickCard(this.opponentKnight);
            this.player2.clickCard(this.opponentBastard);
            this.player2.clickPrompt('Done');

            expect(this.opponentKnight.getStrength()).toBe(3);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('attachment restrictions', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    hand: ['Tourney Steed'],
                    inPlay: [
                        'Tumblestone Knight',
                        { card: 'House Dayne Knight', attachments: ['Tourney Steed'] },
                        'Bastard in Hiding'
                    ],
                    gold: 5
                },
                player2: {}
            });
            this.steed = this.player1.findCardByName('Tourney Steed', 'hand');
        });

        it('can only attach to Knights without a Tourney Steed', function () {
            this.player1.clickCard(this.steed);

            expect(this.player1).toBeAbleToSelect(this.tumblestoneKnight);
            expect(this.player1).not.toBeAbleToSelect(this.houseDayneKnight);
            expect(this.player1).not.toBeAbleToSelect(this.bastardInHiding);
        });
    });
});
