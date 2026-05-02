import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ToastInSecret extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Put character into play',
            target: {
                cardCondition: (card) =>
                    card.location === 'hand' &&
                    card.controller === this.controller &&
                    card.getType() === 'character' &&
                    (card.hasTrait('Lord') || card.hasTrait('Lady')) &&
                    GameActions.putIntoPlay({ card }).allow()
            },
            message: '{player} plays {source} to put {target} into play from their hand',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        GameActions.revealCards((context) => ({ card: context.target })),
                        GameActions.putIntoPlay((context) => ({
                            card: context.target
                        })).thenExecute((event) => {
                            this.atEndOfPhase((ability) => ({
                                match: event.card,
                                condition: () =>
                                    ['play area', 'duplicate'].includes(event.card.location),
                                targetLocation: 'any',
                                effect: ability.effects.returnToShadowsIfStillInPlay(true)
                            }));
                        })
                    ),
                    context
                );
            }
        });
    }
}

ToastInSecret.code = '27584';
ToastInSecret.version = '1.0.0';

export default ToastInSecret;
