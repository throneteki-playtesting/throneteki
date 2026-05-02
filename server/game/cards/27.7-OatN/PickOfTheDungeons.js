import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PickOfTheDungeons extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Put character into play',
            target: {
                cardCondition: (card) =>
                    card.location === 'discard pile' &&
                    card.controller !== this.controller &&
                    card.getType() === 'character' &&
                    card.hasPrintedCost() &&
                    card.printedCost() <= 4 &&
                    GameActions.putIntoPlay({ card }).allow()
            },
            message: {
                format: "{player} plays {source} to put {target} into play from {opponent}'s discard pile",
                args: { opponent: (context) => context.target.controller }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({
                        card: context.target,
                        player: context.player
                    })).thenExecute((event) => {
                        this.atEndOfPhase((ability) => ({
                            match: event.card,
                            condition: () =>
                                ['play area', 'duplicate'].includes(event.card.location),
                            targetLocation: 'any',
                            effect: ability.effects.moveToBottomOfDeckIfStillInPlay(true)
                        }));
                    }),
                    context
                );
            }
        });
    }
}

PickOfTheDungeons.code = '27559';
PickOfTheDungeons.version = '1.0.0';

export default PickOfTheDungeons;
