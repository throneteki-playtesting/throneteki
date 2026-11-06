import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SunspearSentinel extends DrawCard {
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

SunspearSentinel.code = '27540';
SunspearSentinel.version = '2.0.1';

export default SunspearSentinel;
