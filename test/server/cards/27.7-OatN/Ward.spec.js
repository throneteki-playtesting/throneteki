describe('Ward', function () {
    describe('during an intrigue challenge', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [
                        'House Maester',
                        { card: 'House Maester', attachments: ['Ward (OatN)'] },
                        'Tumblestone Knight'
                    ]
                },
                player2: {
                    inPlay: [
                        'House Maester',
                        { card: 'House Maester', attachments: ['Ward (OatN)'] }
                    ]
                }
            });

            [this.attacker, this.warded] = this.player1
                .filterCardsByName('House Maester', 'play area')
                .sort((a, b) => a.attachments.length - b.attachments.length);
            this.bystander = this.player1.findCardByName('Tumblestone Knight', 'play area');
            [this.defender, this.opponentWarded] = this.player2
                .filterCardsByName('House Maester', 'play area')
                .sort((a, b) => a.attachments.length - b.attachments.length);
        });

        it('contributes the attached character STR while it is not participating', function () {
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.attacker);
            this.player1.clickPrompt('Done');

            expect(this.game.currentChallenge.attackerStrength).toBe(4);
            expect(this.game.currentChallenge.defenderStrength).toBe(0);
            expect(this.warded.kneeled).toBe(false);
            expect(this.bystander.kneeled).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });

        it('does not add the STR twice when the attached character participates', function () {
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.warded);
            this.player1.clickPrompt('Done');

            expect(this.game.currentChallenge.attackerStrength).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });

        it('contributes for the opponent only once they control a participating character', function () {
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.attacker);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();

            this.player2.clickCard(this.defender);
            this.player2.clickPrompt('Done');

            expect(this.game.currentChallenge.attackerStrength).toBe(4);
            expect(this.game.currentChallenge.defenderStrength).toBe(4);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('during a military challenge', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: [
                        'Bastard in Hiding',
                        { card: 'House Maester', attachments: ['Ward (OatN)'] }
                    ]
                },
                player2: {}
            });
            this.attacker = this.player1.findCardByName('Bastard in Hiding', 'play area');
        });

        it('does not contribute the attached character STR', function () {
            this.player1.clickPrompt('Military');
            this.player1.clickCard(this.attacker);
            this.player1.clickPrompt('Done');

            expect(this.game.currentChallenge.attackerStrength).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('attachment restriction', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    shadows: ['Ward (OatN)'],
                    inPlay: ['House Maester', 'Eddard Stark (Core)', 'The Roseroad'],
                    gold: 5
                },
                player2: {}
            });
            this.ward = this.player1.findCardByName('Ward', 'shadows');
        });

        it('can only be attached to characters with a printed STR of 3 or lower', function () {
            this.player1.clickCard(this.ward);

            expect(this.player1).toBeAbleToSelect(this.houseMaester);
            expect(this.player1).not.toBeAbleToSelect(this.eddardStark);
            expect(this.player1).not.toBeAbleToSelect(this.theRoseroad);
        });
    });
});
