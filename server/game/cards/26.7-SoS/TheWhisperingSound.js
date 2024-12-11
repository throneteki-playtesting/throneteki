import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheWhisperingSound extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Kneel to reveal hand',
            phase: 'taxation',
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {costs.kneel} to reveal their hand',
            gameAction: GameActions.revealCards((context) => ({
                player: context.player,
                cards: context.player.hand
            })).then({
                target: {
                    activePromptTitle: 'Select a location (optional)',
                    optional: true,
                    cardCondition: (card, context) =>
                        context.event.revealed.includes(card) &&
                        card.getType() === 'location' &&
                        card.hasTrait('Warship')
                },
                handler: (context) => {
                    if (context.target) {
                        this.game.addMessage(
                            'Then, {0} chooses to put {1} into play from their hand, knelt',
                            context.player,
                            context.target
                        );
                        this.game.resolveGameAction(
                            GameActions.putIntoPlay((context) => ({
                                card: context.target,
                                kneeled: true
                            })),
                            context
                        );
                    }
                }
            })
        });
    }
}

TheWhisperingSound.code = '26593';
TheWhisperingSound.version = '1.0.0';

export default TheWhisperingSound;
