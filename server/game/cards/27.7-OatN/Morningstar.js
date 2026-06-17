// Claude: reaction stands+removes attached character after winning by 5+ STR; no STR bonus
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Morningstar extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.strengthDifference >= 5 &&
                    this.parent &&
                    this.parent.isParticipating()
            },
            message: '{player} uses {source} to stand {target} and remove them from the challenge',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously([
                        GameActions.standCard({ card: this.parent }),
                        GameActions.removeFromChallenge({ card: this.parent })
                    ]),
                    context
                );
            }
        });
    }
}

Morningstar.code = '27592';
Morningstar.version = '1.1.0';

export default Morningstar;
