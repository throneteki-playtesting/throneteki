import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class BrightEyedRecruit extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onDeclaredAsDefender: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card !== this &&
                    card.kneeled &&
                    (card.hasTrait('Recruit') || card.owner !== this.controller)
            },
            message: '{player} uses {source} to stand {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.standCard((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }
}

BrightEyedRecruit.code = '27554';
BrightEyedRecruit.version = '2.0.0';

export default BrightEyedRecruit;
