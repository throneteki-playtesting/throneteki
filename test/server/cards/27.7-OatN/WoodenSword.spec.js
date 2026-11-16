describe('Wooden Sword', function () {
    describe('defending icon', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: ['House Maester', 'Bastard in Hiding'] },
                player2: {
                    inPlay: [
                        { card: 'House Maester', attachments: ['Wooden Sword'] },
                        'Bastard in Hiding'
                    ]
                }
            });
            this.attacker = this.player1.findCardByName('House Maester', 'play area');
            this.armed = this.player2.findCardByName('House Maester', 'play area');
        });

        it('gives a military icon while its controller is the defending player', function () {
            expect(this.armed.hasIcon('military')).toBe(false);

            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.attacker);
            this.player1.clickPrompt('Done');

            expect(this.armed.hasIcon('military')).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when its controller is the attacking player', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [
                        { card: 'House Maester', attachments: ['Wooden Sword'] },
                        'Bastard in Hiding'
                    ]
                },
                player2: {}
            });
            this.armed = this.player1.findCardByName('House Maester', 'play area');
        });

        it('does not give a military icon', function () {
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.armed);
            this.player1.clickPrompt('Done');

            expect(this.armed.hasIcon('military')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('sacrifice ability', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [
                        { card: 'House Maester', attachments: ['Wooden Sword'] },
                        { card: 'Samwell Tarly (Core)', attachments: ['Longclaw'] },
                        { card: 'Eddard Stark (Core)', attachments: ['Bodyguard'] }
                    ]
                },
                player2: {
                    inPlay: [{ card: 'Tumblestone Knight', attachments: ['Ice (Core)'] }]
                }
            });
            this.sword = this.player1.findCardByName('Wooden Sword', 'play area');
            this.longclaw = this.player1.findCardByName('Longclaw', 'play area');
            this.bodyguard = this.player1.findCardByName('Bodyguard', 'play area');
            this.ice = this.player2.findCardByName('Ice', 'play area');
        });

        it('sacrifices itself to discard another Weapon attachment', function () {
            this.player1.clickMenu(this.sword, 'Discard a Weapon');

            expect(this.player1).toBeAbleToSelect(this.longclaw);
            expect(this.player1).toBeAbleToSelect(this.ice);
            expect(this.player1).not.toBeAbleToSelect(this.bodyguard);
            expect(this.player1).not.toBeAbleToSelect(this.sword);

            this.player1.clickCard(this.ice);

            expect(this.sword.location).toBe('discard pile');
            expect(this.ice.location).toBe('discard pile');
            expect(this.longclaw.location).toBe('play area');
            expect(this.bodyguard.location).toBe('play area');
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('with no other Weapon in play', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: { inPlay: [{ card: 'House Maester', attachments: ['Wooden Sword'] }] },
                player2: {}
            });
        });

        it('cannot be used without a target', function () {
            expect(this.player1.actionUnavailableReason(this.woodenSword)).toBe('target');
        });
    });

    describe('outside the challenges phase', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    inPlay: [{ card: 'House Maester', attachments: ['Wooden Sword', 'Longclaw'] }]
                },
                player2: {}
            });
        });

        it('cannot be used', function () {
            expect(this.player1.actionUnavailableReason(this.woodenSword)).toBe('phase');
        });
    });
});
