import DrawCard from '../../drawcard.js';

class Lannisport extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            gold: 1
        });
        this.persistentEffect({
            targetController: 'opponent',
            match: (player) => player.hand.length < this.controller.hand.length,
            effect: [ability.effects.cannotInitiateChallengeType('power', () => this.controller)]
        });
    }
}

Lannisport.code = '26533';
Lannisport.version = '1.0.0';

export default Lannisport;
