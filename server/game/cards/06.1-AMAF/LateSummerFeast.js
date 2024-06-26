import PlotCard from '../../plotcard.js';

class LateSummerFeast extends PlotCard {
    setupCardAbilities() {
        this.forcedReaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && event.challenge.loser.canDraw()
            },
            handler: (context) => {
                let otherPlayer = context.event.challenge.loser;

                this.game.addMessage(
                    '{0} is forced by {1} to allow {2} to draw 1 card',
                    this.controller,
                    this,
                    otherPlayer
                );
                this.game.promptWithMenu(otherPlayer, this, {
                    activePrompt: {
                        menuTitle: 'Draw 1 card from ' + this.name + '?',
                        buttons: [
                            { text: 'Yes', method: 'draw' },
                            { text: 'No', method: 'pass' }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    draw(otherPlayer) {
        otherPlayer.drawCardsToHand(1);
        this.game.addMessage('{0} draws 1 card', otherPlayer);

        return true;
    }

    pass(otherPlayer) {
        this.game.addMessage('{0} declines to draw 1 card', otherPlayer);

        return true;
    }
}

LateSummerFeast.code = '06020';

export default LateSummerFeast;
