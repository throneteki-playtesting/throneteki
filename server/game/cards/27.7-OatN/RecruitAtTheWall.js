import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class RecruitAtTheWall extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.initiatingPlayer !== this.controller
            },
            limit: ability.limit.perPhase(1),
            message: {
                format: '{player} uses {source} to have {source} gain {icon} icon until the end of the phase',
                args: {
                    icon: (context) =>
                        `${context.event.challenge.challengeType === 'intrigue' ? 'an' : 'a'} ${context.event.challenge.challengeType}`
                }
            },
            gameAction: GameActions.genericHandler((context) => {
                this.untilEndOfPhase((ability) => ({
                    match: this,
                    effect: ability.effects.addIcon(context.event.challenge.challengeType)
                }));
            })
        });
    }
}

RecruitAtTheWall.code = '27554';
RecruitAtTheWall.version = '1.0.0';

export default RecruitAtTheWall;
