import DrawCard from '../../drawcard.js';

class SerAlliserThorne extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) =>
                    event.card.controller === this.controller &&
                    this.game.isDuringChallenge({ challengeType: 'military' })
            },
            target: {
                cardCondition: (card) =>
                    card.getType() === 'character' &&
                    card.location === 'play area' &&
                    card.controller === this.controller &&
                    card.isFaction('thenightswatch') &&
                    !card.isParticipating()
            },
            message: '{player} uses {source} to have {target} participate in the challenge',
            handler: (context) => {
                this.game.currentChallenge.addParticipantToSide(
                    context.target.controller,
                    context.target
                );
            },
            limit: ability.limit.perPhase(1)
        });
    }
}

SerAlliserThorne.code = '27549';
SerAlliserThorne.version = '1.1.0';

export default SerAlliserThorne;
