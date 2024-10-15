import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Butterbumps extends DrawCard {
    setupCardAbilities(ability) {
        const participatingNonUniqueCharacters = (context) =>
            context.game.currentChallenge
                .getParticipants()
                .filter((card) => card.isMatch({ type: 'character', unique: false }));

        this.reaction({
            when: {
                onCardOutOfShadows: (event) =>
                    event.card === this &&
                    this.game.isDuringChallenge({ challengeType: 'intrigue' })
            },
            message: {
                format: '{player} uses {source} to stand and remove {cards} from challenge',
                args: { cards: participatingNonUniqueCharacters }
            },
            gameAction: GameActions.simultaneously((context) =>
                participatingNonUniqueCharacters(context).flatMap((card) => [
                    GameActions.standCard({ card }),
                    GameActions.removeFromChallenge({ card })
                ])
            ),
            limit: ability.limit.perRound(1)
        });
    }
}

Butterbumps.code = '26587';
Butterbumps.version = '1.0.0';

export default Butterbumps;
