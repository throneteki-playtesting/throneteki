describe('Sent to the Wall', function () {
    function setup(context, { opponentPlot, attachedToOpponent = true }) {
        context.setupTest({
            phase: 'plot',
            player1: {
                inPlay: attachedToOpponent
                    ? ['House Maester']
                    : [{ card: 'Bastard in Hiding', attachments: ['Sent to the Wall'] }]
            },
            player2: {
                plotDeck: [opponentPlot],
                inPlay: attachedToOpponent
                    ? [
                          {
                              card: 'Bastard in Hiding',
                              attachments: [{ card: 'Sent to the Wall', owner: 'player1' }]
                          }
                      ]
                    : ['House Maester']
            }
        });
        context.wall = context.player1.findCardByName('Sent to the Wall', 'play area');
        context.victim = attachedToOpponent
            ? context.player2.findCardByName('Bastard in Hiding', 'play area')
            : context.player1.findCardByName('Bastard in Hiding', 'play area');
    }

    describe('when the controller of the attached character reveals a plot with the named trait', function () {
        beforeEach(function () {
            setup(this, { opponentPlot: 'A Noble Cause' });
            this.player1.triggerAbility(this.wall);
            this.player1.nameTrait('Noble');
            this.player1.selectPlot('Filler Plot');
            this.player2.selectPlot('A Noble Cause');
            this.selectFirstPlayer(this.player1);
        });

        it('discards the attached character from play', function () {
            expect(this.victim.location).toBe('discard pile');
            expect(this.wall.location).toBe('discard pile');
        });
    });

    describe('when the plot does not have the named trait', function () {
        beforeEach(function () {
            setup(this, { opponentPlot: 'A Noble Cause' });
            this.player1.triggerAbility(this.wall);
            this.player1.nameTrait('Winter');
            this.player1.selectPlot('Filler Plot');
            this.player2.selectPlot('A Noble Cause');
            this.selectFirstPlayer(this.player1);
        });

        it('does nothing', function () {
            expect(this.victim.location).toBe('play area');
            expect(this.wall.location).toBe('play area');
        });
    });

    describe('when only a different player reveals a plot with the named trait', function () {
        beforeEach(function () {
            setup(this, { opponentPlot: 'A Noble Cause', attachedToOpponent: false });
            this.player1.triggerAbility(this.wall);
            this.player1.nameTrait('Noble');
            this.player1.selectPlot('Filler Plot');
            this.player2.selectPlot('A Noble Cause');
            this.selectFirstPlayer(this.player1);
        });

        it('does nothing', function () {
            expect(this.victim.location).toBe('play area');
        });
    });
});
