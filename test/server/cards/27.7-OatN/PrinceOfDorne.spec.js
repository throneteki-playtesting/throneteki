describe('Prince of Dorne', function () {
    describe('attachment restriction and icon', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    hand: ['Prince of Dorne'],
                    inPlay: [
                        'Doran Martell (Core)',
                        'Dorea Sand (OatN)',
                        'House Dayne Knight',
                        'Eddard Stark (Core)'
                    ],
                    gold: 3
                },
                player2: {}
            });
            this.doran = this.player1.findCardByName('Doran Martell', 'play area');
            this.obara = this.player1.findCardByName('Dorea Sand', 'play area');
            this.nonUnique = this.player1.findCardByName('House Dayne Knight', 'play area');
            this.eddard = this.player1.findCardByName('Eddard Stark', 'play area');
            this.player1.clickCard(this.princeOfDorne);
        });

        it('can only be attached to a unique Martell character you control', function () {
            expect(this.player1).toBeAbleToSelect(this.doran);
            expect(this.player1).toBeAbleToSelect(this.obara);
            expect(this.player1).not.toBeAbleToSelect(this.nonUnique);
            expect(this.player1).not.toBeAbleToSelect(this.eddard);
        });

        it('gives Doran Martell a military icon but not other characters', function () {
            expect(this.doran.hasIcon('military')).toBe(false);
            this.player1.clickCard(this.doran);

            expect(this.doran.hasIcon('military')).toBe(true);
        });
    });

    describe('when claim is applied for a military challenge you attacked', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [{ card: 'Doran Martell (Core)', attachments: ['Prince of Dorne'] }]
                },
                player2: { hand: ['Hedge Knight'], inPlay: ['Bastard in Hiding'] }
            });
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.doranMartell);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('applies intrigue claim instead and the attached character gains 1 power', function () {
            expect(this.doranMartell.hasIcon('military')).toBe(true);
            expect(this.player1).toAllowAbilityTrigger(this.princeOfDorne);
            this.player1.triggerAbility(this.princeOfDorne);

            expect(this.doranMartell.power).toBe(1);
            expect(this.hedgeKnight.location).toBe('discard pile');
            expect(this.player2.findCardByName('Bastard in Hiding', 'play area').location).toBe(
                'play area'
            );
        });
    });

    describe('when the opponent attacked with a military challenge', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    inPlay: [{ card: 'Doran Martell (Core)', attachments: ['Prince of Dorne'] }]
                },
                player2: { inPlay: ['Bastard in Hiding'] }
            });
            this.attacker = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player2.clickPrompt('Military');
            this.player2.clickCard(this.attacker);
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.princeOfDorne);
        });
    });

    describe('when attached to a character that is not Doran Martell', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    inPlay: [{ card: 'Dorea Sand (OatN)', attachments: ['Prince of Dorne'] }]
                },
                player2: {}
            });
        });

        it('gives no military icon', function () {
            expect(this.doreaSand.hasIcon('military')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
