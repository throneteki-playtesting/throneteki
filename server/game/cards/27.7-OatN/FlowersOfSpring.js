// Generated with Claude Code - claude-opus-4-5-20250101
// - 2026-02-01: Created implementation for "Flowers of Spring"

import DrawCard from '../../drawcard.js';

class FlowersOfSpring extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onPhaseStarted: (event) => event.phase === 'challenge'
            },
            choosePlayer: true,
            message:
                '{player} plays {source} to prevent {chosenPlayer} from playing non-Song events until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'any',
                    match: context.chosenPlayer,
                    effect: ability.effects.cannotPlay(
                        (card) => card.getType() === 'event' && !card.hasTrait('Song')
                    )
                }));
            }
        });
    }
}

FlowersOfSpring.code = '27608';
FlowersOfSpring.version = '1.0.0';

export default FlowersOfSpring;
