import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class FightingPit extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Put character into play',
            phase: 'challenge',
            target: {
                cardCondition: (card, context) =>
                    card.location === 'discard pile' &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    card.getPrintedCost() <= 3 &&
                    context.player.canPutIntoPlay(card)
            },
            cost: ability.costs.sacrificeSelf(),
            message: '{player} sacrifices {source} to discard a card',
            handler: (context) => {
                this.game
                    .resolveGameAction(
                        GameActions.genericHandler((context) => {
                            this.game.promptForSelect(context.player, {
                                activePromptTitle: 'Select a card',
                                source: this,
                                cardCondition: (card) =>
                                    card.location === 'hand' && card.controller === context.player,
                                onSelect: (player, card) => this.cardSelected(player, card)
                            });
                        })
                    )
                    .then({
                        // TODO BD search is probably the wrong action here?
                        gameAction: GameActions.search({
                            title: 'Select a character',
                            location: 'discard pile',
                            match: {
                                type: 'character',
                                printedCostOrLower: 3,
                                condition: (card) => this.controller.canPutIntoPlay(card)
                            },
                            reveal: false,
                            message: '{player} {gameAction}',
                            gameAction: GameActions.putIntoPlay((context) => ({
                                player: context.player,
                                card: context.searchTarget
                            })).thenExecute((event) => {
                                this.atEndOfPhase((ability) => ({
                                    match: event.card,
                                    condition: () =>
                                        ['play area', 'duplicate'].includes(event.card.location),
                                    targetLocation: 'any',
                                    effect: ability.effects.returnToHandIfStillInPlay(true)
                                }));
                            })
                        })
                    });
            }
        });
    }
}

FightingPit.code = '00260';

export default FightingPit;
