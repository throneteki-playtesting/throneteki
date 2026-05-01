import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheMermansShield extends DrawCard {
    setupCardAbilities() {
        this.interrupt({
            when: {
                onSacrificed: (event) => event.card === this
            },
            message:
                '{player} uses {source} to place {source} in shadows instead of placing it in their discard pile',
            gameAction: GameActions.putIntoShadows({ card: this })
        });
    }
}

TheMermansShield.code = '27564';
TheMermansShield.version = '1.0.0';

export default TheMermansShield;
