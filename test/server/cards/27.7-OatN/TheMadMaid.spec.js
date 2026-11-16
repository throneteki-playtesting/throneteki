describe('The Mad Maid', function () {
    describe('insight', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['The Mad Maid'], shadows: [] },
                player2: { shadows: ['Alan of Rosby'] }
            });
        });

        it('is lost while any player has a card in shadows', function () {
            expect(this.theMadMaid.hasKeyword('insight')).toBe(false);
        });
    });

    describe('with no cards in shadows', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['The Mad Maid'] },
                player2: {}
            });
        });

        it('gains insight', function () {
            expect(this.theMadMaid.hasKeyword('insight')).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('when a House Hightower character is knelt', function () {
        function setup(context, cardType) {
            context.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: ['The Mad Maid'],
                    shadows: ['Alan of Rosby', 'Ward (OatN)']
                },
                player2: { shadows: ['Castle Black Wormways'] }
            });
            context.alan = context.player1.findCardByName('Alan of Rosby', 'shadows');
            context.ward = context.player1.findCardByName('Ward', 'shadows');
            context.wormways = context.player2.findCardByName('Castle Black Wormways', 'shadows');
            context.player1.clickPrompt('Intrigue');
            context.player1.clickCard(context.theMadMaid);
            context.player1.clickPrompt('Done');
            context.player1.triggerAbility(context.theMadMaid);
            context.player1.clickPrompt(cardType);
        }

        it('discards the revealed card from shadows when it matches the declared cardtype', function () {
            setup(this, 'Character');

            expect(this.player1).toBeAbleToSelect(this.alan);
            expect(this.player1).toBeAbleToSelect(this.ward);
            expect(this.player1).toBeAbleToSelect(this.wormways);

            this.player1.clickCard(this.alan);

            expect(this.alan.location).toBe('discard pile');
            expect(this.ward.location).toBe('shadows');
            expect(this.wormways.location).toBe('shadows');
        });

        it('leaves the revealed card in shadows when it does not match', function () {
            setup(this, 'Location');
            this.player1.clickCard(this.alan);

            expect(this.alan.location).toBe('shadows');
            expect(this.wormways.location).toBe('shadows');
        });

        it('can discard an opponent card in shadows', function () {
            setup(this, 'Location');
            this.player1.clickCard(this.wormways);

            expect(this.wormways.location).toBe('discard pile');
            expect(this.alan.location).toBe('shadows');
        });
    });

    describe('when a character without House Hightower is knelt', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                player1: {
                    inPlay: ['The Mad Maid', 'House Maester'],
                    shadows: ['Alan of Rosby']
                },
                player2: {}
            });
            this.player1.clickPrompt('Intrigue');
            this.player1.clickCard(this.houseMaester);
            this.player1.clickPrompt('Done');
        });

        it('is not offered', function () {
            expect(this.player1).not.toAllowAbilityTrigger(this.theMadMaid);
        });
    });
});
