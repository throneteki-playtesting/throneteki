import ChallengeKeywordsWindow from './ChallengeKeywordsWindow.js';
import GameKeywords from '../gamekeywords.js';

const initiatingKeywords = ['stealth', 'assault'];

class InitiatingKeywordsWindow extends ChallengeKeywordsWindow {
    constructor(game, challenge) {
        super(game, challenge);
        this.cardsWithContext = this.buildContexts(challenge.declaredAttackers);
    }

    continue() {
        for (let keyword of initiatingKeywords) {
            let ability = GameKeywords[keyword];
            let participantsWithKeyword = this.cardsWithContext.filter((participant) =>
                ability.canResolve(participant.context)
            );

            if (participantsWithKeyword.length > 0) {
                this.resolveAbility(ability, participantsWithKeyword);
            }
        }

        return true;
    }
}

export default InitiatingKeywordsWindow;
