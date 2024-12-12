import DrawCard from '../../drawcard.js';

class TheWardenOfTheNorth extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ faction: 'stark', trait: 'Lord' });

        this.whileAttached({
            effect: [ability.effects.addTrait('Commander'), ability.effects.addKeyword('Renown')]
        });

        this.whileAttached({
            condition: () => this.parent.isParticipating(),
            match: (player) => player !== this.controller,
            effect: [
                ability.effects.cannotPutIntoPlay((card) => card.location === 'shadows'),
                ability.effects.cannotPlay((card) => card.getPrintedType() === 'event')
            ]
        });
    }
}

TheWardenOfTheNorth.code = '23006';
TheWardenOfTheNorth.version = '1.0.0';

export default TheWardenOfTheNorth;
