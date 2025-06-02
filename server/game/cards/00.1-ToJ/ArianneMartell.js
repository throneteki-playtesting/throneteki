import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ArianneMartell extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Remove and gain icon',
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character'
            },
            handler: (context) => {
                this.game.promptForIcon(this.controller, this, (icon) => {
                    this.untilEndOfPhase((ability) => ({
                        match: context.target,
                        effect: ability.effects.removeIcon(icon)
                    }));

                    let nonMartellChars = this.controller.filterCardsInPlay(
                        (card) => card.getType() === 'character' && !card.isFaction('martell')
                    );
                    this.untilEndOfPhase((ability) => ({
                        match: nonMartellChars,
                        effect: ability.effects.addIcon(icon)
                    }));

                    this.game.addMessage(
                        '{0} uses {1} to remove {2} {3} icon from {4} and have each non-Martell character they control gain it',
                        this.controller,
                        this,
                        icon === 'intrigue' ? 'an' : 'a',
                        icon,
                        context.target
                    );

                    this.game.resolveGameAction(
                        GameActions.putIntoPlay((context) => ({
                            card: context.target
                        })).then({
                            message: 'Then {player} returns {source} to hand',
                            gameAction: GameActions.returnCardToHand((context) => ({
                                card: context.source,
                                allowSave: false
                            }))
                        }),
                        context
                    );
                });
            }
        });
    }
}

ArianneMartell.code = '00173';

export default ArianneMartell;
