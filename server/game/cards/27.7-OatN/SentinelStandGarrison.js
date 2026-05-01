import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SentinelStandGarrison extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.controller.anyCardsInPlay(
                    (card) =>
                        card.controller === this.controller &&
                        card.isDefending() &&
                        card.getNumberOfIcons() <= 1
                ),
            effect: ability.effects.contributeCharacterStrength(this)
        });
        this.forcedReaction({
            when: {
                afterChallenge: (event) => this.controller === event.challenge.loser
            },
            message: '{player} is forced to kneel {source}',
            gameAction: GameActions.kneelCard({ card: this })
        });
    }
}

SentinelStandGarrison.code = '27552';
SentinelStandGarrison.version = '1.0.2';

export default SentinelStandGarrison;
