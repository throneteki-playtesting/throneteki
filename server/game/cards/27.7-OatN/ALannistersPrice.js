import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

const buildGainPowerGameAction = () =>
    GameActions.gainPower((context) => ({ card: context.player.faction, amount: 2 }));

class ALannistersPrice extends DrawCard {
    // A Lannister's Price (27535)
    // Reaction: After you win an [intrigue] challenge by 5 or more STR, gain 2 power for your
    // faction. The losing opponent may give you 2 gold to cancel this effect. (Max 1 per
    // challenge.)
    setupCardAbilities(ability) {
        this.reaction({
            max: ability.limit.perChallenge(1),
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    event.challenge.challengeType === 'intrigue' &&
                    event.challenge.strengthDifference >= 5 &&
                    context.player.canGainFactionPower()
            },
            message: '{player} plays {source} to gain 2 power for their faction',
            gameAction: GameActions.ifCondition({
                condition: (context) =>
                    context.ability.cannotBeCanceled || context.event.challenge.loser.gold < 2,
                thenAction: buildGainPowerGameAction(),
                elseAction: GameActions.choose({
                    player: (context) => context.event.challenge.loser,
                    choices: {
                        'Allow event': {
                            message: {
                                format: '{loser} chooses to allow {player} to gain 2 power for their faction',
                                args: { loser: (context) => context.event.challenge.loser }
                            },
                            gameAction: buildGainPowerGameAction()
                        },
                        'Give 2 gold': {
                            message: {
                                format: '{loser} chooses to give {player} 2 gold to cancel {source}',
                                args: { loser: (context) => context.event.challenge.loser }
                            },
                            gameAction: GameActions.transferGold((context) => ({
                                from: context.event.challenge.loser,
                                to: context.player,
                                amount: 2
                            }))
                        }
                    }
                })
            })
        });
    }
}

ALannistersPrice.code = '27535';
ALannistersPrice.version = '1.0.0';

export default ALannistersPrice;
