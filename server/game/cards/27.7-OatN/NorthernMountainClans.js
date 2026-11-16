import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import TextHelper from '../../TextHelper.js';

class NorthernMountainClans extends DrawCard {
    // Northern Mountain Clans (27504)
    // Ambush (6). No attachments.
    // Reaction: After you win a challenge in which Northern Mountain Clans is attacking, choose X
    // characters. Those characters cannot stand during the standing phase this round. X is the
    // claim value on your revealed plot card.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event, context) =>
                    event.challenge.winner === context.player && context.source.isAttacking()
            },
            message: '{player} uses {source} to prevent characters from standing this round',
            gameAction: GameActions.chooseCards({
                mode: 'exactly',
                numCards: (context) => context.player.getClaim(),
                title: (context) =>
                    `Select ${TextHelper.count(context.player.getClaim(), 'character')}`,
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character',
                gameAction: (card) =>
                    GameActions.lastingEffect(() => ({
                        duration: 'untilEndOfRound',
                        match: card,
                        effect: ability.effects.cannotBeStood()
                    }))
            })
        });
    }
}

NorthernMountainClans.code = '27504';
NorthernMountainClans.version = '1.0.1';

export default NorthernMountainClans;
