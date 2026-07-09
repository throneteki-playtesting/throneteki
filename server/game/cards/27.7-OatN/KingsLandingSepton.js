import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class KingsLandingSepton extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            when: {
                onCardAbilityInitiated: (event) =>
                    event.source.controller !== this.controller &&
                    event.ability.isTriggeredAbility() &&
                    (event.source.getType() === 'character' ||
                        event.source.getType() === 'location' ||
                        event.source.getType() === 'attachment')
            },
            cost: ability.costs.returnSelfToHand(),
            message: {
                format: "{player} uses {source} and returns {source} to their hand to cancel {character}'s ability",
                args: { character: (context) => context.event.source }
            },
            limit: ability.limit.perRound(1),
            gameAction: GameActions.genericHandler((context) => {
                context.event.cancel();
            })
        });
    }
}

KingsLandingSepton.code = '27530';
KingsLandingSepton.version = '1.0.1';

export default KingsLandingSepton;
