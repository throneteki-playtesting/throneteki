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
                '{player} uses {source} to put {source} into play instead of placing it in their discard pile and have it gain an intrigue icon until the end of the phase',
            gameAction: GameActions.simultaneously([
                GameActions.putIntoPlay((context) => ({ card: context.event.card })),
                GameActions.genericHandler(() => {
                    this.untilEndOfPhase((ability) => ({
                        match: this,
                        effect: [ability.effects.addIcon('intrigue')]
                    }));
                })
            ])
        });
    }
}

SunspearSentinel.code = '27540';
SunspearSentinel.version = '2.0.0';

export default SunspearSentinel;
