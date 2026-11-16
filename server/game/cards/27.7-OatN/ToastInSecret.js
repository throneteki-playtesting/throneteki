import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ToastInSecret extends DrawCard {
    // Toast in Secret (27584)
    // Shadow (1).
    // Play only during a [power] challenge.
    // Action: Choose a participating Lord or Lady character. Until the end of the challenge, that
    // character gets +1 STR for each card you control in shadows. If you win this challenge by 5 or
    // more STR, stand that character and have them gain 2 power. (Max 1 per phase.)
    setupCardAbilities(ability) {
        this.action({
            title: 'Buff participating Lord or Lady',
            condition: (context) => context.game.isDuringChallenge({ challengeType: 'power' }),
            max: ability.limit.perPhase(1),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating() &&
                    (card.hasTrait('Lord') || card.hasTrait('Lady')),
                gameAction: GameActions.simultaneously([
                    GameActions.lastingEffect((context) => ({
                        duration: 'untilEndOfChallenge',
                        match: context.target,
                        effect: ability.effects.modifyStrength(context.player.shadows.length)
                    })),
                    GameActions.delayedEffect((context) => {
                        const challenge = context.game.currentChallenge;
                        const card = context.target;
                        return {
                            duration: 'untilEndOfPhase',
                            title: card.name,
                            when: {
                                afterChallenge: (event) =>
                                    event.challenge === challenge &&
                                    event.challenge.winner === context.player &&
                                    event.challenge.strengthDifference >= 5
                            },
                            message: {
                                format: '{player} uses {source} to stand {card} and have it gain 2 power',
                                args: { card: () => card }
                            },
                            gameAction: GameActions.simultaneously([
                                GameActions.standCard({ card }),
                                GameActions.gainPower({ card, amount: 2 })
                            ])
                        };
                    })
                ])
            },
            message: {
                format: '{player} plays {source} to give {target} +{amount} STR until the end of the challenge',
                args: { amount: (context) => context.player.shadows.length }
            }
        });
    }
}

ToastInSecret.code = '27584';
ToastInSecret.version = '1.1.0';

export default ToastInSecret;
