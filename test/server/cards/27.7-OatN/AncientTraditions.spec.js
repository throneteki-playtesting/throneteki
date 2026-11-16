describe('Ancient Traditions', function () {
    describe('while you control an Old Gods character', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    inPlay: [
                        { card: 'Tumblestone Knight', attachments: ['Ancient Traditions'] },
                        'Woods Witch',
                        'Bastard in Hiding'
                    ]
                },
                player2: {
                    hand: ['Put to the Sword'],
                    inPlay: ['Bastard in Hiding', 'Bastard in Hiding', 'Bastard in Hiding'],
                    gold: 2
                }
            });
            this.protected = this.player1.findCardByName('Tumblestone Knight', 'play area');
            this.witch = this.player1.findCardByName('Woods Witch', 'play area');
            this.bystander = this.player1.findCardByName('Bastard in Hiding', 'play area');
            this.put = this.player2.findCardByName('Put to the Sword', 'hand');
            this.attackers = this.player2.filterCardsByName('Bastard in Hiding', 'play area');

            this.player2.clickPrompt('Military');
            for (const attacker of this.attackers) {
                this.player2.clickCard(attacker);
            }
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('makes the attached character immune to opponent card effects', function () {
            this.player2.clickCard(this.put);

            expect(this.player2).not.toBeAbleToSelect(this.protected);
            expect(this.player2).toBeAbleToSelect(this.witch);
            expect(this.player2).toBeAbleToSelect(this.bystander);
        });
    });

    describe('while you control no Old Gods character', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'challenge',
                firstPlayer: 'player2',
                player1: {
                    inPlay: [
                        { card: 'Tumblestone Knight', attachments: ['Ancient Traditions'] },
                        'Bastard in Hiding'
                    ]
                },
                player2: {
                    hand: ['Put to the Sword'],
                    inPlay: ['Bastard in Hiding', 'Bastard in Hiding', 'Bastard in Hiding'],
                    gold: 2
                }
            });
            this.protected = this.player1.findCardByName('Tumblestone Knight', 'play area');
            this.put = this.player2.findCardByName('Put to the Sword', 'hand');
            this.attackers = this.player2.filterCardsByName('Bastard in Hiding', 'play area');

            this.player2.clickPrompt('Military');
            for (const attacker of this.attackers) {
                this.player2.clickCard(attacker);
            }
            this.player2.clickPrompt('Done');
            this.skipActionWindow();
            this.player1.clickPrompt('Done');
            this.skipActionWindow();
        });

        it('does not make the attached character immune', function () {
            this.player2.clickCard(this.put);

            expect(this.player2).toBeAbleToSelect(this.protected);
        });
    });

    describe('against plot and agenda effects', function () {
        beforeEach(function () {
            this.setupTest({
                phase: 'plot',
                player1: {
                    inPlay: [
                        { card: 'Tumblestone Knight', attachments: ['Ancient Traditions'] },
                        'Woods Witch'
                    ]
                },
                player2: { plotDeck: ['Filthy Accusations'] }
            });
            this.protected = this.player1.findCardByName('Tumblestone Knight', 'play area');
            this.player1.selectPlot('Filler Plot');
            this.player2.selectPlot('Filthy Accusations');
            this.selectFirstPlayer(this.player2);
        });

        it('does not make the attached character immune to a plot', function () {
            expect(this.player2).toBeAbleToSelect(this.protected);
        });
    });
});
