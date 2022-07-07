const DrawCard = require('../../drawcard.js');
const TextHelper = require('../../TextHelper');

class TheValeofArryn extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event, context) => (
                    event.challenge.winner === this.controller && this.isDefending()
                )
            },
            handler: context => {
                let numDrawn = context.player.drawCardsToHand(this.getNumToDraw(context.player)).length();
                this.game.addMessage('{0} uses {1} to draw {2}', context.player, this, TextHelper.count(numDrawn, 'card'));
            }
        });
    }

    getNumToDraw(player) {
        return player.getNumberOfCardsInPlay(card => card.hasTrait('House Arryn') && card.isParticipating())
    }
}

TheValeofArryn.code = '23033';

module.exports = TheValeofArryn;
