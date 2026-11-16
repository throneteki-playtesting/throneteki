describe('Goghor the Giant', function () {
    describe('with a Weapon attached', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    faction: 'targaryen',
                    inPlay: [{ card: 'Goghor the Giant', attachments: ['Wooden Sword'] }]
                },
                player2: {}
            });
        });

        it('gains intimidate', function () {
            expect(this.goghorTheGiant.hasKeyword('intimidate')).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('without a Weapon attached', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    faction: 'targaryen',
                    hand: ['Wooden Sword'],
                    inPlay: ['Goghor the Giant', 'House Maester'],
                    gold: 5
                },
                player2: {}
            });
        });

        it('has no intimidate', function () {
            expect(this.goghorTheGiant.hasKeyword('intimidate')).toBe(false);
        });

        it('gains intimidate once a Weapon is attached and keeps it off other characters', function () {
            this.player1.clickCard(this.woodenSword);
            this.player1.clickCard(this.goghorTheGiant);

            expect(this.goghorTheGiant.hasKeyword('intimidate')).toBe(true);
            expect(this.houseMaester.hasKeyword('intimidate')).toBe(false);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('attachments other than Weapons', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    hand: ['Bodyguard'],
                    inPlay: ['Goghor the Giant', 'Eddard Stark (Core)'],
                    gold: 5
                },
                player2: {}
            });
        });

        it('cannot be attached to Goghor', function () {
            this.player1.clickCard(this.bodyguard);

            expect(this.player1).not.toBeAbleToSelect(this.goghorTheGiant);
            expect(this.player1).toBeAbleToSelect(this.eddardStark);
        });
    });
});
