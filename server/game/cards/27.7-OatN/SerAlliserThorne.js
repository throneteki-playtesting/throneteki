import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SerAlliserThorne extends DrawCard {
    // Ser Alliser Thorne (27549)
    // Shadow (5). No attachments except Weapon.
    // Reaction: After a card you control comes out of shadows during a [military] challenge
    // initiated by or against you, choose a [thenightswatch] character you control and have it
    // participate in the challenge on your side. (Limit once per phase.)
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event, context) =>
                    event.card.controller === context.player &&
                    context.game.isDuringChallenge({ challengeType: 'military' })
            },
            target: {
                cardCondition: (card, context) =>
                    card.getType() === 'character' &&
                    card.location === 'play area' &&
                    card.controller === context.player &&
                    card.isFaction('thenightswatch'),
                gameAction: GameActions.addToChallenge((context) => ({
                    card: context.target,
                    player: context.player
                }))
            },
            message: '{player} uses {source} to have {target} participate in the challenge',
            limit: ability.limit.perPhase(1)
        });
    }
}

SerAlliserThorne.code = '27549';
SerAlliserThorne.version = '1.1.0';

export default SerAlliserThorne;
