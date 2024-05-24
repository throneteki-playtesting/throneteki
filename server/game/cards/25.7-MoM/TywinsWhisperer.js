import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';

class TywinsWhisperer extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardReturnedToHand: (event) =>
                    event.card.controller !== this.controller &&
                    event.card.isMatch({ type: 'character', printedCostOrLower: 2 })
            },
            location: 'hand',
            message:
                '{player} uses {source} to put {source} into play from their hand, and have it gain a power icon and stealth until the end of the phase',
            gameAction: GameActions.putIntoPlay({ card: this }).then({
                gameAction: GameActions.genericHandler(() => {
                    this.untilEndOfPhase((ability) => ({
                        match: this,
                        effect: [
                            ability.effects.addIcon('power'),
                            ability.effects.addKeyword('stealth')
                        ]
                    }));
                })
            })
        });
    }
}

TywinsWhisperer.code = '25530';
TywinsWhisperer.version = '1.0';

export default TywinsWhisperer;
