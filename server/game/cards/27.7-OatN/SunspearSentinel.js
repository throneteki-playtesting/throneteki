import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SunspearSentinel extends DrawCard {
    // Sunspear Sentinel (27540)
    // Stealth. No attachments except Weapon.
    // Interrupt: When Sunspear Sentinel is discarded for [intrigue] claim, put it into play instead
    // of placing it in your discard pile.
    setupCardAbilities() {
        this.interrupt({
            when: {
                onCardDiscarded: (event, context) => event.card === context.source && event.isClaim
            },
            location: ['hand'],
            message:
                '{player} uses {source} to put {source} into play instead of placing it in their discard pile',
            gameAction: GameActions.replaceEvent((context) => ({
                event: context.event,
                replacement: GameActions.putIntoPlay({ card: context.source })
            }))
        });
    }
}

SunspearSentinel.code = '27540';
SunspearSentinel.version = '2.0.1';

export default SunspearSentinel;
