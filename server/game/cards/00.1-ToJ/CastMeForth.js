import PlotCard from '../../plotcard.js';

class CastMeForth extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.canAmbush(
                (card) =>
                    card.controller === this.controller &&
                    card.location === 'dead pile' &&
                    card.getType() === 'character' &&
                    (card.hasTrait('Drowned God') || card.hasTrait('Raider')) &&
                    !card.isUnique()
            )
        });
        this.persistentEffect({
            targetLocation: ['hand', 'dead pile'],
            match: (card) => card.hasTrait('Drowned God') || card.hasTrait('Raider'),
            effect: ability.effects.gainAmbush()
        });
    }
}

CastMeForth.code = '00132';

export default CastMeForth;
