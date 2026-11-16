import DrawCard from '../../drawcard.js';

class PodrickPayne extends DrawCard {
    // Podrick Payne (27527)
    // While you control Brienne of Tarth, Podrick Payne gains a [military] icon and gets +1 STR.
    // While you control Tyrion Lannister, Podrick Payne gains an [intrigue] icon and gets +1 STR.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) =>
                context.source.controller.anyCardsInPlay({ name: 'Brienne of Tarth' }),
            match: (card, context) => card === context.source,
            effect: [ability.effects.addIcon('military'), ability.effects.modifyStrength(1)]
        });
        this.persistentEffect({
            condition: (context) =>
                context.source.controller.anyCardsInPlay({ name: 'Tyrion Lannister' }),
            match: (card, context) => card === context.source,
            effect: [ability.effects.addIcon('intrigue'), ability.effects.modifyStrength(1)]
        });
    }
}

PodrickPayne.code = '27527';
PodrickPayne.version = '1.0.1';

export default PodrickPayne;
