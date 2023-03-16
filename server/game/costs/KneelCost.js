const GameActions = require('../GameActions');

class KneelCost {
    constructor() {
        this.name = 'kneel';
    }

    isEligible(card) {
        return GameActions.kneelCard({ card, reason: 'cost' }).allow();
    }

    pay(cards, context) {
        context.game.resolveGameAction(
            GameActions.simultaneously(
                cards.map(card => GameActions.kneelCard({ card, reason: 'cost' }))
            )
        );
    }
}

module.exports = KneelCost;
