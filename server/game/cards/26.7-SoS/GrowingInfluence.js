import range from 'lodash.range';
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class GrowingInfluence extends DrawCard {
    setupCardAbilities() {
        const chooseXValue = ({ min, max, context }, onSelect) => {
            let choices = range(min, max + 1).reverse();

            const menuObject = {
                selectXValue: (_player, xValue) => {
                    context.xValue = xValue;
                    onSelect(xValue);
                    return true;
                }
            };

            context.game.promptWithMenu(context.player, menuObject, {
                activePrompt: {
                    menuTitle: 'Select value of X',
                    controls: [
                        {
                            type: 'select-from-values',
                            command: 'menuButton',
                            method: 'selectXValue',
                            selectableValues: choices.map((choice) => choice.toString())
                        }
                    ]
                },
                source: context.source
            });
        };

        this.action({
            title: 'Give opponent gold',
            phase: 'marshal',
            condition: (context) => context.player.gold > 0 && context.player.firstPlayer,
            chooseOpponent: true,
            handler: (context) => {
                chooseXValue({ min: 1, max: context.player.gold, context }, (xValue) => {
                    this.game.addMessage(
                        '{0} plays {1} to give {2} {3} gold',
                        context.player,
                        context.source,
                        context.opponent,
                        xValue
                    );
                    this.game.resolveGameAction(
                        GameActions.transferGold((context) => ({
                            source: context.player,
                            target: context.opponent,
                            amount: xValue
                        })).then((context) => ({
                            target: {
                                cardCondition: {
                                    location: 'play area',
                                    type: 'character',
                                    controller: context.opponent,
                                    printedCostOrLower: context.xValue
                                }
                            },
                            message: 'Then {player} removes {target} from the game',
                            handler: (context) => {
                                this.game.resolveGameAction(
                                    GameActions.removeFromGame({
                                        card: context.target
                                    }),
                                    context
                                );

                                this.game.once('onPhaseStarted', () => {
                                    this.game.addMessage(
                                        '{0} puts {1} into play under their control due to {2}',
                                        context.player,
                                        context.target,
                                        context.source
                                    );

                                    this.game.resolveGameAction(
                                        GameActions.putIntoPlay({
                                            card: context.target,
                                            player: context.player
                                        })
                                    );
                                });
                            }
                        })),
                        context
                    );
                });
            }
        });
    }
}

GrowingInfluence.code = '26596';
GrowingInfluence.version = '1.0.1';

export default GrowingInfluence;
