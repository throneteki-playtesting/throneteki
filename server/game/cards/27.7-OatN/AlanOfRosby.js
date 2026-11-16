import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AlanOfRosby extends DrawCard {
    // Alan of Rosby (27551)
    // Shadow (1).
    // Reaction: After Alan of Rosby comes out of shadows during a challenge, stand a defending
    // [thenightswatch] character you control.
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) =>
                    event.card === context.source && context.game.isDuringChallenge()
            },
            target: {
                cardCondition: {
                    type: 'character',
                    defending: true,
                    controller: 'current',
                    faction: 'thenightswatch'
                },
                gameAction: GameActions.standCard((context) => ({ card: context.target }))
            },
            message: '{player} uses {source} to stand {target}'
        });
    }
}

AlanOfRosby.code = '27551';
AlanOfRosby.version = '1.0.0';

export default AlanOfRosby;
