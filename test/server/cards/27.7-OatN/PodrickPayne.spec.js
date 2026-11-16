describe('Podrick Payne', function () {
    describe('without Brienne of Tarth or Tyrion Lannister', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Podrick Payne (OatN)'] },
                player2: { inPlay: ['Brienne of Tarth (GoH)', 'Tyrion Lannister (Core)'] }
            });
        });

        it('gains nothing, even when an opponent controls them', function () {
            expect(this.podrickPayne.getStrength()).toBe(3);
            expect(this.podrickPayne.hasIcon('military')).toBe(false);
            expect(this.podrickPayne.hasIcon('intrigue')).toBe(false);
            expect(this.podrickPayne.hasIcon('power')).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('with Brienne of Tarth', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Podrick Payne (OatN)', 'Brienne of Tarth (GoH)'] },
                player2: {}
            });
        });

        it('gains a military icon and +1 STR, and Brienne is unchanged', function () {
            expect(this.podrickPayne.getStrength()).toBe(4);
            expect(this.podrickPayne.hasIcon('military')).toBe(true);
            expect(this.podrickPayne.hasIcon('intrigue')).toBe(false);
            expect(this.brienneOfTarth.getStrength()).toBe(5);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('with Tyrion Lannister', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: { inPlay: ['Podrick Payne (OatN)', 'Tyrion Lannister (Core)'] },
                player2: {}
            });
        });

        it('gains an intrigue icon and +1 STR, and Tyrion is unchanged', function () {
            expect(this.podrickPayne.getStrength()).toBe(4);
            expect(this.podrickPayne.hasIcon('intrigue')).toBe(true);
            expect(this.podrickPayne.hasIcon('military')).toBe(false);
            expect(this.tyrionLannister.getStrength()).toBe(4);
            expect(this.player1).isReadyToTakeAction();
        });
    });

    describe('with both', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'marshal',
                player1: {
                    inPlay: [
                        'Podrick Payne (OatN)',
                        'Brienne of Tarth (GoH)',
                        'Tyrion Lannister (Core)'
                    ]
                },
                player2: {}
            });
        });

        it('gains both icons and +2 STR', function () {
            expect(this.podrickPayne.getStrength()).toBe(5);
            expect(this.podrickPayne.hasIcon('military')).toBe(true);
            expect(this.podrickPayne.hasIcon('intrigue')).toBe(true);
            expect(this.player1).isReadyToTakeAction();
        });
    });
});
