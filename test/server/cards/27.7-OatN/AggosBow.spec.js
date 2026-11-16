describe("Aggo's Bow", function () {
    describe('stealth', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    inPlay: [
                        { card: 'Aggo', attachments: ["Aggo's Bow"] },
                        { card: 'Braided Warrior', attachments: ["Aggo's Bow"] }
                    ]
                },
                player2: {}
            });
            this.aggo = this.player1.findCardByName('Aggo', 'play area');
            this.warrior = this.player1.findCardByName('Braided Warrior', 'play area');
        });

        it('gives stealth to Aggo only', function () {
            expect(this.aggo.hasKeyword('stealth')).toBe(true);
            expect(this.warrior.hasKeyword('stealth')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('attachment restriction', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    hand: ["Aggo's Bow"],
                    inPlay: ['Braided Warrior', 'Bastard in Hiding'],
                    gold: 5
                },
                player2: {}
            });
        });

        it('can only be attached to Dothraki characters', function () {
            this.player1.clickCard(this.aggosBow);

            expect(this.player1).toBeAbleToSelect(this.braidedWarrior);
            expect(this.player1).not.toBeAbleToSelect(this.bastardInHiding);
        });
    });

    describe('action', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [
                        { card: 'Braided Warrior', attachments: ["Aggo's Bow"] },
                        'Bastard in Hiding',
                        'House Maester'
                    ]
                },
                player2: { inPlay: ['Tumblestone Knight'] }
            });
            this.warrior = this.player1.findCardByName('Braided Warrior', 'play area');
            this.bastard = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.maester = this.player1.findCardByName('House Maester', 'play area');
        });

        it('kneels the attached character to have it participate in a military challenge', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.bastard);
            this.player1.clickPrompt('Done');

            this.player1.clickMenu(this.aggosBow, 'Kneel attached to participate');

            expect(this.warrior.kneeled).toBe(true);
            expect(this.game.currentChallenge.isAttacking(this.warrior)).toBe(true);
            expect(this.game.currentChallenge.isAttacking(this.bastard)).toBe(true);
            expect(this.player2).isReadyToTakeAction();
        });

        it('cannot be used in a challenge that is not military', function () {
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.maester);
            this.player1.clickPrompt('Done');

            expect(this.player1.actionUnavailableReason(this.aggosBow)).toBe('condition');
            expect(this.warrior.kneeled).toBe(false);
        });

        it('cannot be used when the attached character is already participating', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.warrior);
            this.player1.clickPrompt('Done');

            expect(this.player1.actionUnavailableReason(this.aggosBow)).toBeDefined();
        });

        it('cannot be used outside a challenge', function () {
            expect(this.player1.actionUnavailableReason(this.aggosBow)).toBeDefined();
        });
    });
});
