import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheWardenOfTheEast extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'House Arryn' });
        this.whileAttached({
            effect: [ability.effects.addTrait('Commander'), ability.effects.modifyStrength(2)]
        });
        this.reaction({
            when: {
                onCardRevealed: (event) =>
                    event.card.getType() === 'character' &&
                    event.card.controller !== this.controller &&
                    ['hand', 'draw deck', 'shadows'].includes(event.card.location)
            },
            limit: ability.limit.perPhase(1),
            message: {
                format: '{player} uses {source} to have {parent} gain 1 power',
                args: { parent: () => this.parent }
            },
            gameAction: GameActions.gainPower({ card: this.parent, amount: 1 })
        });
    }
}

TheWardenOfTheEast.code = '26604';
TheWardenOfTheEast.version = '1.0.0';

export default TheWardenOfTheEast;
