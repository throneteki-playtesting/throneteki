import DrawCard from '../../drawcard.js';

class WritInInk extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Add to challenge',
            condition: () => this.game.isDuringChallenge({ challengeType: 'intrigue' }),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
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
WritInInk.version = '1.0.0';

export default WritInInk;
