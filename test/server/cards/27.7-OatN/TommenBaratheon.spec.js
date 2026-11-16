describe('Tommen Baratheon', function () {
    function setup(context, { plot, challenge, attacker, opponentPlot = 'Filler Plot' }) {
        context.setupTest({
            phase: 'challenge',
            player1: {
                plot,
                inPlay: [
                    'Tommen Baratheon (OatN)',
                    'Courtesan of the Rose',
                    'Brightwater Commander',
                    'Bastard in Hiding'
                ]
            },
            player2: {
                plot: opponentPlot,
                inPlay: ['Courtesan of the Rose', 'Tumblestone Knight']
            }
        });
        context.courtesan = context.player1.findCardByName('Courtesan of the Rose', 'play area');
        context.commander = context.player1.findCardByName('Brightwater Commander', 'play area');
        context.bastard = context.player1.findCardByName('Bastard in Hiding', 'play area');
        context.opponentCourtesan = context.player2.findCardByName(
            'Courtesan of the Rose',
            'play area'
        );
        context.player1.clickPrompt(challenge);
        for (const name of attacker) {
            context.player1.clickCard(context[name]);
        }
        context.player1.clickPrompt('Done');
    }

    describe('military challenges', function () {
        it('gives +2 STR to participating Tyrell characters with a Noble plot revealed', function () {
            setup(this, {
                plot: 'A Noble Cause',
                challenge: 'Military',
                attacker: ['commander', 'bastard']
            });

            expect(this.commander.getStrength()).toBe(6);
            expect(this.bastard.getStrength()).toBe(2);
            expect(this.courtesan.getStrength()).toBe(2);
            expect(this.opponentCourtesan.getStrength()).toBe(2);
            expect(this.player1).isReadyToTakeAction();
        });

        it('gives no bonus when no Noble plot is revealed', function () {
            setup(this, {
                plot: 'Filler Plot',
                challenge: 'Military',
                attacker: ['commander']
            });

            expect(this.commander.getStrength()).toBe(4);
        });

        it('gives the bonus when the opponent reveals the Noble plot', function () {
            setup(this, {
                plot: 'Filler Plot',
                opponentPlot: 'A Noble Cause',
                challenge: 'Military',
                attacker: ['commander']
            });

            expect(this.commander.getStrength()).toBe(6);
        });
    });

    describe('intrigue challenges', function () {
        it('gives +2 STR with an Edict plot revealed', function () {
            setup(this, {
                plot: 'Barring the Gates',
                challenge: 'Intrigue',
                attacker: ['courtesan']
            });

            expect(this.courtesan.getStrength()).toBe(4);
            expect(this.commander.getStrength()).toBe(4);
        });

        it('gives no bonus with only a Noble plot revealed', function () {
            setup(this, {
                plot: 'A Noble Cause',
                challenge: 'Intrigue',
                attacker: ['courtesan']
            });

            expect(this.courtesan.getStrength()).toBe(2);
        });
    });

    describe('power challenges', function () {
        it('gives +2 STR with a Kingdom plot revealed', function () {
            setup(this, {
                plot: 'A Noble Cause',
                challenge: 'Power',
                attacker: ['courtesan', 'bastard']
            });

            expect(this.courtesan.getStrength()).toBe(4);
            expect(this.bastard.getStrength()).toBe(2);
        });

        it('gives no bonus without a Kingdom plot', function () {
            setup(this, {
                plot: 'Barring the Gates',
                challenge: 'Power',
                attacker: ['courtesan']
            });

            expect(this.courtesan.getStrength()).toBe(2);
        });
    });
});
