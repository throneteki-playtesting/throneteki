import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ScreamingHorde extends DrawCard {
    // Screaming Horde (27576)
    // Assault. Shadow (5). No attachments.
    // Reaction: After Screaming Horde comes out of shadows, put a Dothraki character into play from
    // your hand or discard pile. At the end of the phase, if that card is still in play, return it
    // to your hand.
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) => event.card === context.source
            },
            target: {
                cardCondition: (card, context) =>
                    ['hand', 'discard pile'].includes(card.location) &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    card.hasTrait('Dothraki'),
                gameAction: GameActions.simultaneously([
                    GameActions.putIntoPlay((context) => ({
                        player: context.player,
                        card: context.target
                    })),
                    GameActions.delayedEffect((context) => {
                        const card = context.target;
                        return {
                            duration: 'untilTriggered',
                            title: card.name,
                            when: { onAtEndOfPhase: () => true },
                            until: { onCardLeftPlay: (event) => event.card === card },
                            gameAction: GameActions.ifCondition({
                                condition: () => ['play area', 'duplicate'].includes(card.location),
                                thenAction: {
                                    message:
                                        '{player} resolves the delayed effect from {source}: {gameAction}',
                                    gameAction: GameActions.returnCardToHand({
                                        card,
                                        allowSave: true
                                    })
                                }
                            })
                        };
                    })
                ])
            },
            message: '{player} uses {source} to put {target} into play'
        });
    }
}

ScreamingHorde.code = '27576';
ScreamingHorde.version = '2.0.1';

export default ScreamingHorde;
