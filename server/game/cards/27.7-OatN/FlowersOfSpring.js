import DrawCard from '../../drawcard.js';

class FlowersOfSpring extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onPhaseStarted: () => true
            },
            message:
                '{player} plays {source} to prevent each player from playing non-Song events until the end of the phase',
            handler: () => {
                this.untilEndOfPhase((ability) => ({
                    targetController: 'any',
                    effect: ability.effects.cannotPlay(
                        (card) => card.getType() === 'event' && !card.hasTrait('Song')
                    )
                }));
            }
        });
    }
}

FlowersOfSpring.code = '27608';
FlowersOfSpring.version = '1.0.1';

export default FlowersOfSpring;
