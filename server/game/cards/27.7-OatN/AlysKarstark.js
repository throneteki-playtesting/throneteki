import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AlysKarstark extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.controller.anyCardsInPlay((card) => card.hasTrait('Wildling')),
            match: this,
            effect: [ability.effects.addTrait('Wildling'), ability.effects.addTrait("R'hllor")]
        });
        this.reaction({
            when: {
                onPlotsRevealed: (event) =>
                    event.plots.some((plot) => plot.hasTrait('Winter')) &&
                    this.allowGameAction('gainPower')
            },
            target: {
                activePromptTitle: 'Select a character',
                cardCondition: {
                    type: 'character',
                    controller: this.controller,
                    condition: (card) => card.getTraits().some((trait) => this.hasTrait(trait))
                }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.gainPower((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

AlysKarstark.code = '27550';
AlysKarstark.version = '1.0.0';

export default AlysKarstark;
