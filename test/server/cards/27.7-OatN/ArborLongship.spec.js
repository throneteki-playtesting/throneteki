describe('Arbor Longship', function () {
    describe('when it did not come out of shadows this phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: ['Arbor Longship', 'Bastard in Hiding', 'House Maester']
                },
                player2: { inPlay: ['Tumblestone Knight', 'Bastard in Hiding'] }
            });
            this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.maester = this.player1.findCardByName('House Maester', 'play area');
            this.knight = this.player2.findCardByName('Tumblestone Knight', 'play area');
            this.dayne = this.player2.findCardByName('Bastard in Hiding', 'play area');
        });

        it('gives a character attacking alone +2 STR without standing it', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');
            this.player1.clickMenu(this.arborLongship, 'Give solo character +2 STR');

            expect(this.player1).toBeAbleToSelect(this.bastard);
            expect(this.player1).not.toBeAbleToSelect(this.maester);
            expect(this.player1).not.toBeAbleToSelect(this.knight);

            this.player1.clickCard(this.bastard);

            expect(this.bastard.getStrength()).toBe(4);
            expect(this.bastard.kneeled).toBe(true);
            expect(this.arborLongship.kneeled).toBe(true);
            expect(this.player2).isReadyToTakeAction();
        });

        it('cannot choose a character that is not attacking or defending alone', function () {
            this.player1.clickPrompt('Power');
            this.player1.clickCard(this.bastard);
            this.player1.clickCard(this.maester);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickCard(this.knight);
            this.player2.clickCard(this.dayne);
            this.player2.clickPrompt('Done');

            expect(this.player1.actionUnavailableReason(this.arborLongship)).toBe('target');
        });

        it('gives a lone defender +2 STR', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickCard(this.knight);
            this.player2.clickPrompt('Done');
            this.player1.clickMenu(this.arborLongship, 'Give solo character +2 STR');

            expect(this.player1).toBeAbleToSelect(this.bastard);
            expect(this.player1).toBeAbleToSelect(this.knight);
            this.player1.clickCard(this.knight);

            expect(this.knight.getStrength()).toBe(4);
            expect(this.bastard.getStrength()).toBe(2);
            expect(this.player2).isReadyToTakeAction();
        });

        it('cannot be used outside a challenge', function () {
            expect(this.player1.actionUnavailableReason(this.arborLongship)).toBeDefined();
        });
    });

    describe('when it came out of shadows this phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    shadows: ['Arbor Longship'],
                    inPlay: ['Bastard in Hiding'],
                    gold: 1
                },
                player2: { inPlay: ['Tumblestone Knight'] }
            });
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastardInHiding);
            this.player1.clickPrompt('Done');
            this.player1.clickCard(this.arborLongship);
            this.player2.clickPrompt('Pass');
        });

        it('also stands the chosen character', function () {
            this.player1.clickMenu(this.arborLongship, 'Give solo character +2 STR');
            this.player1.clickCard(this.bastardInHiding);

            expect(this.bastardInHiding.getStrength()).toBe(4);
            expect(this.bastardInHiding.kneeled).toBe(false);
            expect(this.player2).isReadyToTakeAction();
        });
    });
});
