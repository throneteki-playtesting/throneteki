// Claude: added location:'hand' so the action is accessible from hand during challenges (actions default to play area)
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ToastInSecret extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Buff participating Lord or Lady',
            location: 'hand',
            condition: () => this.game.isDuringChallenge({ challengeType: 'power' }),
            max: ability.limit.perPhase(1),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating() &&
                    (card.hasTrait('Lord') || card.hasTrait('Lady'))
            },
            message: {
                format: '{player} plays {source} to give {target} +{amount} STR until the end of the challenge',
                args: { amount: () => this.controller.shadows.length }
            },
            handler: (context) => {
                const target = context.target;
                const player = context.player;
                const amount = player.shadows.length;

                this.untilEndOfChallenge((ability) => ({
                    match: target,
                    effect: ability.effects.modifyStrength(amount)
                }));

                this.game.once('afterChallenge', (event) => {
                    if (
                        event.challenge.winner === player &&
                        event.challenge.strengthDifference >= 5 &&
                        target.location === 'play area'
                    ) {
                        this.game.resolveGameAction(
                            GameActions.simultaneously([
                                GameActions.standCard({ card: target }),
                                GameActions.gainPower({ card: target, amount: 2 })
                            ])
                        );
                        this.game.addMessage(
                            '{0} uses {1} to stand {2} and have them gain 2 power',
                            player,
                            this,
                            target
                        );
                    }
                });
            }
        });
    }
}

ToastInSecret.code = '27584';
ToastInSecret.version = '1.1.0';

export default ToastInSecret;
