import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class DoransSpy extends DrawCard {
    setupCardAbilities() {
        this.interrupt({
            when: {
                onCardDiscarded: (event) =>
                    event.card === this &&
                    ['hand'].includes(event.originalLocation) &&
                    this.game.currentChallenge &&
                    this.game.claim.isApplying &&
                    this.game.claim.type === 'intrigue'
            },
            location: ['hand'],
            message:
                '{player} uses {source} to put {source} into play instead of placing it in their discard pile',
            gameAction: GameActions.putIntoPlay((context) => ({ card: context.event.card }))
        });
    }
}

DoransSpy.code = '27540';
DoransSpy.version = '1.0.0';

export default DoransSpy;
