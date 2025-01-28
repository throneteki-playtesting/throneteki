import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SouthboundGalley extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            initiative: 1
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    card.getType() === 'character' && card.isDefending() && card.getPrintedStrength() <= 4
            },

            handler: (context) => {
                this.game.addMessage(
                    '{0} uses {1} to have {2} not contribute their STR to the challenge',
                    this.controller,
                    this,
                    context.target
                )
                
                this.untilEndOfChallenge((ability) => ({
                    match: context.target,
                    effect: ability.effects.doesNotContributeStrength()
                }));
            }
        });
    }
}

SouthboundGalley.code = '26522';
SouthboundGalley.version = '1.1.0';

export default SouthboundGalley;
