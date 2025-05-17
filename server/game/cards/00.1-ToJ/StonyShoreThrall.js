import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class StonyShoreThrall extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: () => this.game.currentPhase === 'challenge'
            },
            cost: ability.costs.kneelSelf(),
            chooseOpponent: true,
            handler: (context) => {
                this.lastingEffect((ability) => ({
                    until: {
                        onCardEntersPlay: (event) =>
                            event.card.getType() === 'plot' &&
                            event.card.controller === context.opponent
                    },
                    match: (card) =>
                        card === card.controller.activePlot && card.controller === context.opponent,
                    effect: ability.effects.modifyReserve(-1)
                }));
                this.game.resolveGameAction(
                    GameActions.may({
                        title: 'Have each player check reserve?',
                        message: {
                            format: '{player} forces each player to check reserve'
                        },
                        gameAction: GameActions.checkReserve()
                    })
                );
            }
        });
    }
}

StonyShoreThrall.code = '00144';

export default StonyShoreThrall;
