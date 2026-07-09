import DrawCard from '../../drawcard.js';

class StannisBaratheon extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'End challenge with no winner or loser',
            phase: 'challenge',
            condition: () =>
                this.game.isDuringChallenge({ challengeType: ['military', 'power'] }) &&
                this.game.anyPlotHasTrait('Winter'),
            cost: ability.costs.kneelFactionCard(),
            message:
                '{player} uses {source} and kneels their faction card to end the challenge with no winner or loser',
            handler: () => {
                const challenge = this.game.currentChallenge;
                const challengeType = challenge.challengeType;
                const attackingPlayer = challenge.attackingPlayer;

                challenge.cancelChallenge();

                const isAttackerController = attackingPlayer === this.controller;
                this.untilEndOfPhase((ability) => ({
                    targetController: isAttackerController ? 'current' : 'opponent',
                    effect: ability.effects.mayInitiateAdditionalChallenge(challengeType)
                }));
                this.game.addMessage(
                    '{0} may initiate an additional {1} challenge this phase',
                    attackingPlayer,
                    challengeType
                );
            }
        });
    }
}

StannisBaratheon.code = '27501';
StannisBaratheon.version = '1.1.0';

export default StannisBaratheon;
