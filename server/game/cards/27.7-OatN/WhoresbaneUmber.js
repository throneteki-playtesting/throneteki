import DrawCard from '../../drawcard.js';

class WhoresbaneUmber extends DrawCard {
    // Whoresbane Umber (27563)
    // While you have fewer than 3 plot cards in your used pile, Whoresbane Umber gains an
    // [intrigue] icon and stealth.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) => context.source.controller.getNumberOfUsedPlots() < 3,
            match: (card, context) => card === context.source,
            effect: [ability.effects.addIcon('intrigue'), ability.effects.addKeyword('stealth')]
        });
    }
}

WhoresbaneUmber.code = '27563';
WhoresbaneUmber.version = '1.1.0';

export default WhoresbaneUmber;
