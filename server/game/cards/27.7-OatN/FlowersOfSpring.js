import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class FlowersOfSpring extends DrawCard {
    // "Flowers of Spring" (27608)
    // Reaction: After a phase begins, each player cannot play non-Song events until the end of the
    // phase.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onPhaseStarted: () => true
            },
            message:
                '{player} plays {source} to prevent each player from playing non-Song events until the end of the phase',
            gameAction: GameActions.lastingEffect(() => ({
                duration: 'untilEndOfPhase',
                targetController: 'any',
                effect: ability.effects.cannotPlay(
                    (card) => card.getType() === 'event' && !card.hasTrait('Song')
                )
            }))
        });
    }
}

FlowersOfSpring.code = '27608';
FlowersOfSpring.version = '1.0.1';

export default FlowersOfSpring;
