import DrawCard from '../../drawcard.js';

class MyrishPirates extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardEntersPlay: (event) => event.card === this
            },
            choices: {
                'Move 1 power': (context) => {}, //check Boats Victarion/Arbor Queen
                'Move 1 gold': (context) => {}
            }
        });
    }
}

MyrishPirates.code = '00116';

export default MyrishPirates;
