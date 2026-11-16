describe('Toast in Secret', function () {
    function setup(
        context,
        { challenge = 'Power', defenders = [], extraShadows = [], attackWithKnight = true } = {}
    ) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                shadows: ['Toast in Secret', ...extraShadows],
                inPlay: ['Margaery Tyrell (Core)', 'Tumblestone Knight'],
                gold: 1
            },
            player2: { inPlay: defenders }
        });
        context.toast = context.player1.findCardByName('Toast in Secret', 'shadows');
        context.eddard = context.player1.findCardByName('Margaery Tyrell', 'play area');
        context.baseStrength = context.eddard.getStrength();
        context.knight = context.player1.findCardByName('Tumblestone Knight', 'play area');
        context.player1.clickPrompt(challenge);
        context.player1.clickCard(context.eddard);
        if (attackWithKnight) {
            context.player1.clickCard(context.knight);
        }
        context.player1.clickPrompt('Done');
    }

    describe('during a power challenge', function () {
        beforeEach(function () {
            setup(this, {
                extraShadows: ['Alan of Rosby', 'Ward (OatN)'],
                defenders: ['Bastard in Hiding']
            });
            this.player1.clickCard(this.toast);
        });

        it('can only choose a participating Lord or Lady character', function () {
            expect(this.player1).toBeAbleToSelect(this.eddard);
            expect(this.player1).not.toBeAbleToSelect(this.knight);
        });

        it('gives +1 STR for each card you control in shadows until the end of the challenge', function () {
            const shadowsBefore = this.player1Object.shadows.length;
            this.player1.clickCard(this.eddard);

            expect(this.eddard.getStrength()).toBe(this.baseStrength + shadowsBefore);
            expect(this.knight.getStrength()).toBe(2);
            expect(this.toast.location).toBe('discard pile');
        });
    });

    describe('when you win by 5 or more STR', function () {
        beforeEach(function () {
            setup(this, { extraShadows: ['Alan of Rosby', 'Ward (OatN)'] });
            this.player1.clickCard(this.toast);
            this.player1.clickCard(this.eddard);
            this.player2.clickPrompt('Pass');
            this.player1.clickPrompt('Pass');
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('stands the character and has it gain 2 power', function () {
            expect(this.eddard.kneeled).toBe(false);
            expect(this.eddard.power).toBe(2);
            expect(this.knight.kneeled).toBe(true);
        });
    });

    describe('during a challenge that is not a power challenge', function () {
        beforeEach(function () {
            setup(this, { challenge: 'Intrigue', attackWithKnight: false });
        });

        it('cannot be played', function () {
            expect(this.player1.actionUnavailableReason(this.toast)).toBe('condition');
        });
    });
});
