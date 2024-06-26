import DrawCard from '../../drawcard.js';

class BowenMarsh extends DrawCard {
    setupCardAbilities(ability) {
        this.plotModifiers({
            reserve: 1
        });
        this.persistentEffect({
            condition: () => this.game.isDuringChallenge({ challengeType: 'intrigue' }),
            match: (card) => card.hasTrait('Steward') && card.getType() === 'character',
            effect: ability.effects.addKeyword('Insight')
        });
    }
}

BowenMarsh.code = '07002';

export default BowenMarsh;
