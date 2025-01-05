import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class MeggaTyrell extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onRemovedFromChallenge: (event) => event.card.isMatch({ type: 'character' })
            },
            message: '{player} uses {source} to gain 1 power for their faction',
            gameAction: GameActions.gainPower((context) => ({
                amount: 1,
                card: context.player.faction
            })),
            limit: ability.limit.perRound(2)
        });
    }
}

MeggaTyrell.code = '26586';
MeggaTyrell.version = '1.0.1';

export default MeggaTyrell;
