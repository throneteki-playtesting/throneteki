describe('Dragonglass Mine', function () {
    describe('with 5 or more power on your faction card', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    faction: 'baratheon',
                    power: 5,
                    inPlay: ['Dragonglass Mine', 'Winterfell Steward', 'Lannisport Merchant']
                },
                player2: {
                    inPlay: ['Grey Wind (Core)', 'Bastard in Hiding']
                }
            });
            this.protected = this.player1.findCardByName('Winterfell Steward', 'play area');
            this.exposed = this.player1.findCardByName('Lannisport Merchant', 'play area');
            this.greyWind = this.player2.findCardByName('Grey Wind', 'play area');
            this.opponentBastard = this.player2.findCardByName('Bastard in Hiding', 'play area');
            this.player1.clickMenu(this.dragonglassMine, 'Grant Immunity');
        });

        it('can only choose a character you control', function () {
            expect(this.player1).toBeAbleToSelect(this.protected);
            expect(this.player1).toBeAbleToSelect(this.exposed);
            expect(this.player1).not.toBeAbleToSelect(this.greyWind);
            expect(this.player1).not.toBeAbleToSelect(this.opponentBastard);
        });

        it('makes the character immune to opponent character abilities until the end of the phase', function () {
            this.player1.clickCard(this.protected);

            expect(this.dragonglassMine.kneeled).toBe(true);
            this.player1.clickPrompt('Done');
            this.player2.clickMenu(this.greyWind, 'Kneel Grey Wind to kill a character');
            expect(this.player2).toBeAbleToSelect(this.exposed);
            expect(this.player2).not.toBeAbleToSelect(this.protected);
        });
    });

    describe('with less than 5 power on your faction card', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    faction: 'baratheon',
                    power: 4,
                    inPlay: ['Dragonglass Mine', 'Winterfell Steward']
                },
                player2: {}
            });
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.dragonglassMine)).toBe('condition');
        });
    });
});
