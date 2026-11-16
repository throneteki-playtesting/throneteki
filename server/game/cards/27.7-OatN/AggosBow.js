import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AggosBow extends DrawCard {
    // Aggo's Bow (27579)
    // Dothraki character only.
    // If this is attached to Aggo, he gains stealth.
    // Action: During a [military] challenge, kneel attached character to have them participate in
    // the challenge.
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Dothraki' });
        this.whileAttached({
            match: (card) => card.name === 'Aggo',
            effect: ability.effects.addKeyword('stealth')
        });
        this.action({
            title: 'Kneel attached to participate',
            condition: (context) => context.game.isDuringChallenge({ challengeType: 'military' }),
            cost: ability.costs.kneelParent(),
            message:
                '{player} uses {source} and kneels {costs.kneel} to have {costs.kneel} participate in the challenge',
            gameAction: GameActions.addToChallenge((context) => ({
                card: context.source.parent,
                player: context.player
            }))
        });
    }
}

AggosBow.code = '27579';
AggosBow.version = '1.0.0';

export default AggosBow;
