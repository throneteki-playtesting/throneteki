import DrawCard from '../../drawcard.js';

class TheRoseroad extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            gold: 1
        });
    }
}

TheRoseroad.code = '00365';

export default TheRoseroad;
