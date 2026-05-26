import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import TextHelper from '../../TextHelper.js';

class JeweledTiara extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Lady' });

        this.whileAttached({
            match: (card) => card.name === 'Cersei Lannister',
            effect: ability.effects.modifyStrength(2)
        });

        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller &&
                    event.challenge.attackingPlayer === this.controller &&
                    event.challenge.challengeType === 'intrigue'
            },
            cost: ability.costs.kneelSelf(),
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
        return Math.trunc(this.game.currentChallenge.strengthDifference / 5);
    }
}

JeweledTiara.code = '27531';
JeweledTiara.version = '1.1.0';

export default JeweledTiara;
