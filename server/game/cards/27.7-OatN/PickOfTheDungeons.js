import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PickOfTheDungeons extends DrawCard {
    // Pick of the Dungeons (27559)
    // Challenges Action: Choose a character in an opponent's discard pile with a printed cost of 4
    // or lower. Put that character into play under your control. At the end of the phase, if that
    // card is still in play, place it on the bottom of its owner's deck.
    setupCardAbilities() {
        this.action({
            title: 'Put character into play',
            phase: 'challenge',
            target: {
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.owner !== context.player &&
                    card.getType() === 'character' &&
                    card.getPrintedCost() <= 4,
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
                                    gameAction: GameActions.returnCardToDeck({
                                        card,
                                        bottom: true,
                                        allowSave: true
                                    })
                                }
                            })
                        };
                    })
                ])
            },
            message:
                '{player} plays {source} to put {target} into play from the discard pile of an opponent'
        });
    }
}

PickOfTheDungeons.code = '27559';
PickOfTheDungeons.version = '1.0.0';

export default PickOfTheDungeons;
