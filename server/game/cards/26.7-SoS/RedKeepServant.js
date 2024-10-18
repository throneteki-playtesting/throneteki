import DrawCard from '../../drawcard.js';

class RedKeepServant extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.controller.anyCardsInPlay({ type: 'location', trait: "King's Landing" }),
            match: this,
            effect: [
                ability.effects.addIcon('intrigue'),
                ability.effects.cannotBeBypassedByStealth()
            ]
        });
    }
}

RedKeepServant.code = '26505';
RedKeepServant.version = '1.0.0';

export default RedKeepServant;
