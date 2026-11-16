import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class BlindBeron extends DrawCard {
    // Blind Beron (27515)
    // Reaction: After you win a challenge by 5 or more STR in which Blind Beron is participating,
    // kill him to put another Drowned God character into play from your dead pile.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player &&
                    context.source.isParticipating() &&
                    event.challenge.strengthDifference >= 5
            },
            cost: ability.costs.killSelf(),
            target: {
                cardCondition: (card, context) =>
                    card !== context.source &&
                    card.location === 'dead pile' &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    card.hasTrait('Drowned God'),
                gameAction: GameActions.putIntoPlay((context) => ({ card: context.target }))
            },
            message: '{player} kills {costs.kill} to put {target} into play from their dead pile'
        });
    }
}

BlindBeron.code = '27515';
BlindBeron.version = '1.0.0';

export default BlindBeron;
