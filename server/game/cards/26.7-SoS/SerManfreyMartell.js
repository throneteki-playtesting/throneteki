import DrawCard from '../../drawcard.js';

class SerManfreyMartell extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.isParticipating(),
            effect: [
                ability.effects.triggerChallengeKeywordOnLosing('renown'),
                ability.effects.triggerChallengeKeywordOnLosing('insight')
            ]
        });
    }
}

SerManfreyMartell.code = '26538';
SerManfreyMartell.version = '1.0.0';

export default SerManfreyMartell;
