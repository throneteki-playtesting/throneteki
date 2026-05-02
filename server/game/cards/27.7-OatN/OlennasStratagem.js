import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class OlennasStratagem extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Place card in shadows',
            target: {
                activePromptTitle: 'Select a card',
                cardCondition: (card) =>
                    card.location === 'discard pile' &&
                    card.controller === this.controller &&
                    card.getType() !== 'event'
            },
            message:
                '{player} uses {source} to place {target} into shadows from their discard pile',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoShadows((context) => ({ card: context.target })).then(
                        () => ({
                            condition: (context) =>
                                context.player.anyCardsInPlay(
                                    (card) => card.name === 'The Queen of Thorns'
                                ),
                            message: 'Then, {player} draws 1 card',
                            gameAction: GameActions.drawCards((context) => ({
                                player: context.player,
                                amount: 1
                            }))
                        })
                    ),
                    context
                );
            }
        });
    }
}

OlennasStratagem.code = '27595';
OlennasStratagem.version = '1.1.0';

export default OlennasStratagem;
