import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class StannisBaratheon extends DrawCard {
    // Stannis Baratheon (27501)
    // Challenges Action: During a [military] or [power] challenge, if there is a Winter plot card
    // revealed, kneel your faction card to end the challenge with no winner or loser. Then, the
    // attacking player may initiate an additional challenge of that type this phase.
    setupCardAbilities(ability) {
        this.action({
            title: 'End challenge with no winner or loser',
            phase: 'challenge',
            condition: (context) =>
                context.game.isDuringChallenge({ challengeType: ['military', 'power'] }) &&
                context.game.anyPlotHasTrait('Winter'),
            cost: ability.costs.kneelFactionCard(),
            message:
                '{player} uses {source} and kneels their faction card to end the challenge with no winner or loser',
            gameAction: GameActions.simultaneously([
                GameActions.endChallenge((context) => ({
                    challenge: context.game.currentChallenge
                })),
                GameActions.lastingEffect((context) => {
                    const { attackingPlayer, challengeType } = context.game.currentChallenge;
                    return {
                        duration: 'untilEndOfPhase',
                        targetController: 'any',
                        match: (player) => player === attackingPlayer,
                        effect: ability.effects.mayInitiateAdditionalChallenge(challengeType)
                    };
                })
            ])
        });
    }
}

StannisBaratheon.code = '27501';
StannisBaratheon.version = '1.1.0';

export default StannisBaratheon;
