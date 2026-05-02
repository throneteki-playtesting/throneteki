import DrawCard from '../../drawcard.js';

class TheKingswood extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Remove character from game',
            cost: [ability.costs.kneelSelf(), ability.costs.sacrificeSelf()],
            phase: 'challenge',
            target: {
                cardCondition: { location: 'play area', faction: 'tyrell', controller: 'current' }
            },
            message:
                '{player} kneels and sacrifices {costs.kneel} to remove {target} from the game until the beginning of the next phase',
            handler: (context) => {
                this.lastingEffect((ability) => ({
                    until: {
                        onPhaseStarted: () => true
                    },
                    match: context.target,
                    targetLocation: ['play area', 'out of game'],
                    effect: ability.effects.removeFromGame()
                }));
            }
        });
    }
}

TheKingswood.code = '27594';
TheKingswood.version = '1.0.0';

export default TheKingswood;
