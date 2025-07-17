import { ChallengeTracker } from '../../EventTrackers/ChallengeTracker.js';
import DrawCard from '../../drawcard.js';

class EagerOpportunist extends DrawCard {
    setupCardAbilities(ability) {
        this.tracker = ChallengeTracker.forRound(this.game);

        this.reaction({
            when: {
                onCardEntersPlay: (event) =>
                    this === event.card &&
                    this.tracker.some({ winner: this.controller, challengeType: 'intrigue' })
            },
            cost: ability.costs.kneelFactionCard(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.getStrength() <= 3
            },
            handler: (context) => {
                context.target.owner.returnCardToHand(context.target);
                this.game.addMessage(
                    "{0} uses {1} to return {2} to {3}'s hand",
                    this.controller,
                    this,
                    context.target,
                    context.target.controller
                );
            }
        });
    }
}

EagerOpportunist.code = '00166';

export default EagerOpportunist;
