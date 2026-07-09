import DrawCard from '../../drawcard.js';

class WritInInk extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Add to challenge',
            cost: ability.costs.playEvent(),
            condition: () => this.game.isDuringChallenge({ challengeType: 'intrigue' }),
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.player &&
                    card.hasIcon('military') &&
                    card.hasTrait('House Harlaw') &&
                    !card.isParticipating()
            },
            message: '{player} plays {source} to add {target} to the challenge',
            handler: (context) => {
                this.game.currentChallenge.addParticipantToSide(context.player, context.target);
            }
        });
    }
}

WritInInk.code = '27523';
WritInInk.version = '1.0.1';

export default WritInInk;
