describe('Screaming Horde', function () {
    describe('when it comes out of shadows', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    faction: 'targaryen',
                    shadows: ['Screaming Horde'],
                    hand: ['Braided Warrior', 'Hedge Knight'],
                    discard: ['Jhiqui (Km)'],
                    gold: 5
                },
                player2: {
                    discard: ['Zollo the Fat'],
                    inPlay: ['Horselord']
                }
            });
            this.warrior = this.player1.findCardByName('Braided Warrior', 'hand');
            this.hedgeKnight = this.player1.findCardByName('Hedge Knight', 'hand');
            this.jhiqui = this.player1.findCardByName('Jhiqui', 'discard pile');
            this.zollo = this.player2.findCardByName('Zollo the Fat', 'discard pile');
            this.horselord = this.player2.findCardByName('Horselord', 'play area');

            this.player1.clickCard(this.screamingHorde);
            this.player1.triggerAbility(this.screamingHorde);
        });

        it('can only choose a Dothraki character in your hand or discard pile', function () {
            expect(this.player1).toBeAbleToSelect(this.warrior);
            expect(this.player1).toBeAbleToSelect(this.jhiqui);
            expect(this.player1).not.toBeAbleToSelect(this.hedgeKnight);
            expect(this.player1).not.toBeAbleToSelect(this.zollo);
            expect(this.player1).not.toBeAbleToSelect(this.horselord);
            expect(this.player1).not.toBeAbleToSelect(this.screamingHorde);
        });

        it('puts the chosen card from hand into play and returns it to hand at the end of the phase', function () {
            this.player1.clickCard(this.warrior);

            expect(this.warrior.location).toBe('play area');
            expect(this.hedgeKnight.location).toBe('hand');
            expect(this.jhiqui.location).toBe('discard pile');
            expect(this.player1).isReadyToTakeAction();

            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Done');

            expect(this.warrior.location).toBe('hand');
            expect(this.screamingHorde.location).toBe('play area');
        });

        it('puts the chosen card from the discard pile into play and returns it to hand at the end of the phase', function () {
            this.player1.clickCard(this.jhiqui);

            expect(this.jhiqui.location).toBe('play area');
            expect(this.warrior.location).toBe('hand');
            expect(this.player1).isReadyToTakeAction();

            this.player1.clickPrompt('Done');
            this.player2.clickPrompt('Done');

            expect(this.jhiqui.location).toBe('hand');
        });
    });

    describe('when the put into play card leaves play before the end of the phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    faction: 'targaryen',
                    shadows: ['Screaming Horde'],
                    hand: ['Braided Warrior'],
                    gold: 5
                },
                player2: {}
            });
            this.player1.clickCard(this.screamingHorde);
            this.player1.triggerAbility(this.screamingHorde);
            this.player1.clickCard(this.braidedWarrior);
        });

        it('stays in play until the end of the phase', function () {
            expect(this.braidedWarrior.location).toBe('play area');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when there is no legal card', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    faction: 'targaryen',
                    shadows: ['Screaming Horde'],
                    hand: ['Hedge Knight'],
                    gold: 5
                },
                player2: {}
            });
            this.player1.clickCard(this.screamingHorde);
        });

        it('does not offer the reaction', function () {
            expect(this.screamingHorde.location).toBe('play area');
            expect(this.player1).not.toAllowAbilityTrigger(this.screamingHorde);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
