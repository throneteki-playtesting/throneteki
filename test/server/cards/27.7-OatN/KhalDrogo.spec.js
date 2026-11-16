describe('Khal Drogo', function () {
    function setup(context, { attacker }) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                inPlay: [
                    'Khal Drogo (OatN)',
                    { card: 'Aggo', kneeling: true },
                    { card: 'Braided Warrior', kneeling: true },
                    { card: 'Eddard Stark (Core)', kneeling: true }
                ]
            },
            player2: { inPlay: ['Tumblestone Knight'] }
        });
        context.aggo = context.player1.findCardByName('Aggo', 'play area');
        context.warrior = context.player1.findCardByName('Braided Warrior', 'play area');
        context.eddard = context.player1.findCardByName('Eddard Stark', 'play area');
        context.knight = context.player2.findCardByName('Tumblestone Knight', 'play area');
        context.player1.clickPrompt('Military');
        context.player1.clickCard(context[attacker]);
        context.player1.clickPrompt('Done');
        context.skipActionWindow();
        context.player2.clickPrompt('Done');
        context.skipActionWindow();
    }

    describe('after you win a challenge as the attacking player', function () {
        beforeEach(function () {
            setup(this, { attacker: 'khalDrogo' });
        });

        it('can only stand a unique Dothraki character', function () {
            expect(this.player1).toAllowAbilityTrigger(this.khalDrogo);
            this.player1.triggerAbility(this.khalDrogo);

            expect(this.player1).toBeAbleToSelect(this.khalDrogo);
            expect(this.player1).toBeAbleToSelect(this.aggo);
            expect(this.player1).not.toBeAbleToSelect(this.warrior);
            expect(this.player1).not.toBeAbleToSelect(this.eddard);
            expect(this.player1).not.toBeAbleToSelect(this.knight);
        });

        it('stands the chosen character', function () {
            this.player1.triggerAbility(this.khalDrogo);
            this.player1.clickCard(this.aggo);
            this.player2.clickCard(this.knight);

            expect(this.aggo.kneeled).toBe(false);
            expect(this.warrior.kneeled).toBe(true);
            expect(this.eddard.kneeled).toBe(true);
        });
    });
});

describe('Khal Drogo when defending', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'challenge',
            firstPlayer: 'player2',
            player1: { inPlay: ['Khal Drogo (OatN)', { card: 'Aggo', kneeling: true }] },
            player2: { inPlay: ['Tumblestone Knight'] }
        });
        this.attacker = this.player2.findCardByName('Tumblestone Knight', 'play area');
        this.player2.clickPrompt('Military');
        this.player2.clickCard(this.attacker);
        this.player2.clickPrompt('Done');
        this.skipActionWindow();
        this.player1.clickCard(this.khalDrogo);
        this.player1.clickPrompt('Done');
        this.skipActionWindow();
    });

    it('is not offered after winning as the defending player', function () {
        expect(this.player1).not.toAllowAbilityTrigger(this.khalDrogo);
    });
});
