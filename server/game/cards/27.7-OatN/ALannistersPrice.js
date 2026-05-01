import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ALannistersPrice extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            max: ability.limit.perChallenge(1),
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.challengeType === 'intrigue' &&
                    event.challenge.strengthDifference >= 5 &&
                    this.controller.canGainFactionPower()
            },
            message: '{player} plays {source} to gain 2 power for their faction',
            gameAction: GameActions.ifCondition({
                condition: (context) =>
                    context.ability.cannotBeCanceled || context.event.challenge.loser.gold < 2,
                thenAction: this.buildGainPowerGameAction(),
                elseAction: GameActions.choose({
                    player: (context) => context.event.challenge.loser,
                    choices: {
                        'Allow event': {
                            message: {
                                format: '{loser} chooses to allow {player} to gain 2 power for their faction',
                                args: { loser: (context) => context.event.challenge.loser }
                            },
                            gameAction: this.buildGainPowerGameAction()
                        },
                        'Give 2 gold': {
                            message: {
                                format: '{loser} chooses to give {player} 2 gold to cancel {source}',
                                args: { loser: (context) => context.event.challenge.loser }
                            },
                            gameAction: GameActions.transferGold((context) => ({
                                source: context.event.challenge.loser,
                                target: context.player,
                                amount: 2
                            }))
                        }
                    }
                })
            })
        });
    }

    buildGainPowerGameAction() {
        return GameActions.gainPower((context) => ({ card: context.player.faction, amount: 2 }));
    }
}

ALannistersPrice.code = '27535';
ALannistersPrice.version = '1.0.0';

export default ALannistersPrice;
