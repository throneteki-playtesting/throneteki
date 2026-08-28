import DrawCard from '../../drawcard.js';

class PodrickPayne extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) =>
                card.name === 'Brienne of Tarth' && card.controller === this.controller,
            effect: [ability.effects.addIcon('military'), ability.effects.modifyStrength(1)]
        });
        this.persistentEffect({
            match: (card) =>
                card.name === 'Tyrion Lannister' && card.controller === this.controller,
            effect: [ability.effects.addIcon('intrigue'), ability.effects.modifyStrength(1)]
        });
    }
}

PodrickPayne.code = '27527';
PodrickPayne.version = '1.0.1';

export default PodrickPayne;
