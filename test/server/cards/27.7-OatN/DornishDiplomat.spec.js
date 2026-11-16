describe('Dornish Diplomat', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: {
                faction: 'martell',
                shadows: ['Dornish Diplomat'],
                inPlay: ['House Dayne Knight', 'Tumblestone Knight'],
                drawDeck: [
                    'Sand Steed (Km)',
                    'Vulture King (FUtG)',
                    'The Bloodroyal (KotI)',
                    'Condemned (NMG)',
                    'Longclaw (Core)',
                    'House Maester',
                    'House Maester',
                    'House Maester',
                    'House Maester',
                    'House Maester',
                    'Patience (SoD)'
                ],
                gold: 3
            },
            player2: { inPlay: ['Bastard in Hiding'] }
        });
        this.sandSteed = this.player1.findCardByName('Sand Steed (Km)', 'draw deck');
        this.vultureKing = this.player1.findCardByName('Vulture King (FUtG)', 'draw deck');
        this.bloodroyal = this.player1.findCardByName('The Bloodroyal (KotI)', 'draw deck');
        this.condemned = this.player1.findCardByName('Condemned (NMG)', 'draw deck');
        this.longclaw = this.player1.findCardByName('Longclaw (Core)', 'draw deck');
        this.patience = this.player1.findCardByName('Patience (SoD)', 'draw deck');
        this.player1.clickCard(this.dornishDiplomat);
        this.player1.triggerAbility(this.dornishDiplomat);
    });

    it('can only choose Martell attachments with printed cost 1 or lower in the top 10 cards', function () {
        expect(this.player1).toBeAbleToSelect(this.sandSteed);
        expect(this.player1).toBeAbleToSelect(this.vultureKing);
        expect(this.player1).toBeAbleToSelect(this.bloodroyal);
        expect(this.player1).toBeAbleToSelect(this.condemned);
        expect(this.player1).not.toBeAbleToSelect(this.longclaw);
        expect(this.player1).not.toBeAbleToSelect(this.patience);
    });
});

describe('Dornish Diplomat resolution', function () {
    beforeEach(function () {
        this.setupTest({
            phase: 'marshal',
            player1: {
                faction: 'martell',
                shadows: ['Dornish Diplomat'],
                inPlay: ['House Dayne Knight'],
                drawDeck: [
                    'Sand Steed (Km)',
                    'Vulture King (FUtG)',
                    'The Bloodroyal (KotI)',
                    'Condemned (NMG)'
                ],
                gold: 3
            },
            player2: { inPlay: ['Bastard in Hiding'] }
        });
        this.player1.clickCard(this.dornishDiplomat);
        this.player1.triggerAbility(this.dornishDiplomat);
        this.player1.clickCard(this.sandSteed);
        this.player1.clickCard(this.vultureKing);
        this.player1.clickCard(this.theBloodroyal);
        this.player1.clickPrompt('Done');
    });

    it('puts up to 3 chosen attachments into play', function () {
        this.player1.clickCard(this.houseDayneKnight);
        this.player1.clickCard(this.houseDayneKnight);
        this.player1.clickCard(this.houseDayneKnight);

        expect(this.sandSteed.location).toBe('play area');
        expect(this.vultureKing.location).toBe('play area');
        expect(this.theBloodroyal.location).toBe('play area');
        expect(this.condemned.location).toBe('draw deck');
        expect(this.houseDayneKnight.attachments.length).toBe(3);
        expect(this.player1).isReadyToTakeAction();
    });
});
