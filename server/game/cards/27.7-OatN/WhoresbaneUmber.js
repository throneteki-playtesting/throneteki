import DrawCard from '../../drawcard.js';

class WhoresbaneUmber extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.controller.getNumberOfUsedPlots() < 3,
            match: this,
            effect: [ability.effects.addIcon('intrigue'), ability.effects.addKeyword('stealth')]
        });
    }
}

WhoresbaneUmber.code = '27563';
WhoresbaneUmber.version = '1.1.0';

export default WhoresbaneUmber;
