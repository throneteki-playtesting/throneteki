import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MeggaTyrell extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onRemovedFromChallenge: (event) => event.card.isMatch({ type: 'character' })
            },
            message: '{player} uses {source} to gain 1 power on {source}',
            gameAction: GameActions.gainPower((context) => ({
                amount: 1,
                card: context.source
            })),
            limit: ability.limit.perRound(1)
        });
    }
}

MeggaTyrell.code = '26586';
MeggaTyrell.version = '1.0.0';

export default MeggaTyrell;
