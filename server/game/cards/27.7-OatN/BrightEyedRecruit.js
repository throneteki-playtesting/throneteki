import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class BrightEyedRecruit extends DrawCard {
    // Bright-Eyed Recruit (27554)
    // Reaction: After Bright-Eyed Recruit is declared as a defender, stand another Recruit
    // character or a character owned by an opponent.
    setupCardAbilities() {
        this.reaction({
            when: {
                onDeclaredAsDefender: (event, context) => event.card === context.source
            },
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card !== context.source &&
                    (card.hasTrait('Recruit') || card.owner !== context.player),
                gameAction: GameActions.standCard((context) => ({ card: context.target }))
            },
            message: '{player} uses {source} to stand {target}'
        });
    }
}

BrightEyedRecruit.code = '27554';
BrightEyedRecruit.version = '2.0.0';

export default BrightEyedRecruit;
