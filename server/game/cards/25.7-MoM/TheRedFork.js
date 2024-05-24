import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';

class TheRedFork extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            initiative: 2
        });
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.isMatch({
                        winner: this.controller,
                        by5: true,
                        challengeType: 'military'
                    })
            },
            location: 'discard pile',
            message: '{player} uses {source} to put {source} into play from their discard pile',
            gameAction: GameActions.putIntoPlay({ card: this })
        });
    }
}

TheRedFork.code = '25605';
TheRedFork.version = '1.0';

export default TheRedFork;
