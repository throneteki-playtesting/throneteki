const DrawCard = require('../../drawcard.js');

class TheHighroad extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            gold: 1
        });
        this.action({
            title: 'Kneel and sacrifice',
            clickToActivate: true,
            cost: [
                ability.costs.kneelSelf(),
                ability.costs.sacrificeSelf()
            ],
            handler: context => {
                // Because the Highroad ends up in the discard pile of its owner
                // prior to the reduction being used, we must specifically match
                // it to the player that activated the ability. Otherwise, in
                // cases like Euron Crow's Eye, the reduction will always go to
                // the owner.
                let currentController = context.player;
                this.game.addMessage('{0} kneels and sacrifices {1} to reduce the cost of the next non-character card they marshall or play by 2', currentController, this);
                this.untilEndOfPhase(ability => ({
                    targetController: 'any',
                    match: player => player === currentController,
                    effect: ability.effects.reduceNextMarshalledOrPlayedCardCost(2, card => card.getType() !== 'character')

                }));
            }
        });
    }
}

TheHighroad.code = '23034';

module.exports = TheHighroad;
