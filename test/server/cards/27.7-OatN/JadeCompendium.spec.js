describe('Jade Compendium', function () {
    describe('STR bonus', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    faction: 'thenightswatch',
                    agenda: 'The Conclave',
                    deck: ['Jade Compendium', 'Jade Compendium', 'Jade Compendium'],
                    inPlay: [
                        { card: 'House Maester', attachments: ['Jade Compendium'] },
                        'House Maester'
                    ]
                },
                player2: {}
            });
            this.agenda = this.theConclave;
        });

        it('gives +1 STR for every 2 facedown cards under your agenda to a Maester', function () {
            const bonus = Math.floor(
                this.agenda.underneath.filter((card) => card.facedown).length / 2
            );
            expect(bonus).toBeGreaterThan(0);
            const [attached, other] = this.player1
                .filterCardsByName('House Maester', 'play area')
                .sort((a, b) => b.attachments.length - a.attachments.length);
            expect(attached.getStrength()).toBe(2 + bonus);
            expect(other.getStrength()).toBe(2);
        });
    });

    describe('when attached to a character that is not a Maester', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    faction: 'thenightswatch',
                    inPlay: [{ card: 'Samwell Tarly (Core)', attachments: ['Jade Compendium'] }]
                },
                player2: {}
            });
        });

        it('gives no bonus', function () {
            expect(this.samwellTarly.getStrength()).toBe(1);
        });
    });

    describe('after winning an intrigue challenge with the attached character participating', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    faction: 'thenightswatch',
                    agenda: 'The Conclave',
                    deck: ['Jade Compendium', 'Jade Compendium', 'Jade Compendium'],
                    inPlay: [{ card: 'House Maester', attachments: ['Jade Compendium'] }]
                },
                player2: {}
            });
            this.jade = this.jadeCompendium;
            this.agenda = this.theConclave;
            this.handBefore = this.player1Object.hand.length;
            this.underneathBefore = this.agenda.underneath.length;
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.houseMaester);
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('kneels to draw 2 cards, then places 1 card from hand facedown under the agenda', function () {
            expect(this.player1).toAllowAbilityTrigger(this.jade);
            this.player1.triggerAbility(this.jade);

            expect(this.jade.kneeled).toBe(true);
            expect(this.player1).toHavePrompt('Select a card');

            const placed = this.player1Object.hand[0];
            this.player1.clickCard(placed);

            expect(this.agenda.underneath.length).toBe(this.underneathBefore + 1);
            expect(placed.location).toBe('underneath');
            expect(this.player1Object.hand.length).toBe(this.handBefore + 2 - 1);
        });
    });
});
