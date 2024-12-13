import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TorchAndOil extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDrawn: (event) => event.player !== this.controller
            },
            cost: ability.costs.kneelSelf(),
            message: {
                format: '{player} kneels {costs.kneel} to reveal a card drawn by {opponent}',
                args: { opponent: (context) => context.event.player }
            },
            gameAction: GameActions.revealCards((context) => ({
                cards: [context.event.card],
                player: context.event.player
            })).then({
                message: '{player} {gameAction}',
                gameAction: GameActions.ifCondition({
                    condition: (context) =>
                        context.event.cards[0].isMatch({ type: 'character' }) &&
                        context.event.revealed.length > 0,
                    thenAction: GameActions.simultaneously([
                        GameActions.discardCard((context) => ({
                            card: context.event.revealed[0]
                        })),
                        GameActions.standCard(() => ({
                            card: this.parent
                        }))
                    ])
                })
            })
        });
    }
}

TorchAndOil.code = '26556';
TorchAndOil.version = '1.0.0';

export default TorchAndOil;
