const GameActions = require('../../GameActions/index.js');
const DrawCard = require('../../drawcard.js');

class LittleBird extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: event => event.card === this
            },
            message: '{player} uses {source} to draw 1 card',
            gameAction: GameActions.drawCards(context => ({ player: context.player, amount: 1 }))
        });
    }
}

LittleBird.code = '25602';
LittleBird.version = '1.0';

module.exports = LittleBird;
