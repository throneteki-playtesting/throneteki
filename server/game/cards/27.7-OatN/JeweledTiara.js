import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import TextHelper from '../../TextHelper.js';

class JeweledTiara extends DrawCard {
    setupCardAbilities() {
        this.attachmentRestriction({ trait: 'Lady' });
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.attackingPlayer === this.controller &&
                    event.challenge.challengeType === 'intrigue'
            },
            message: {
                format: "{player} uses {source} to discard {amount} from {opponent}'s hand",
                args: {
                    amount: () => TextHelper.count(this.getAmount(), 'card'),
                    opponent: (context) => context.event.challenge.loser
                }
            },
            gameAction: GameActions.discardAtRandom((context) => ({
                player: context.event.challenge.loser,
                amount: this.getAmount()
            }))
        });
    }

    getAmount() {
        this.parent.name === 'Cersei Lannister' ? 2 : 1;
    }
}

JeweledTiara.code = '27531';
JeweledTiara.version = '1.0.0';

export default JeweledTiara;
