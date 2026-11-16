import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';

class StreetsOfKingsLanding extends AgendaCard {
    // Streets of King's Landing (27620)
    // Your deck must include at least 12 King's Landing locations. You cannot gain power from
    // challenge bonuses (unopposed and rivals).
    // Reaction: After you win a challenge, kneel a King's Landing location to have it gain 1 power.
    // (Limit 3 times per round.)
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.cannotGainChallengeBonus()
        });

        this.reaction({
            when: {
                afterChallenge: (event, context) => event.challenge.winner === context.player
            },
            cost: ability.costs.kneel({ type: 'location', trait: "King's Landing" }),
            message: {
                format: '{player} kneels {cost} to gain 1 power',
                args: { cost: (context) => context.costs.kneel }
            },
            gameAction: GameActions.gainPower((context) => ({
                amount: 1,
                card: context.costs.kneel
            })),
            limit: ability.limit.perRound(3)
        });
    }
}

StreetsOfKingsLanding.code = '27620';
StreetsOfKingsLanding.version = '1.0.1';

export default StreetsOfKingsLanding;
