import DrawCard from '../../drawcard.js';

class TheKingsPrize extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () => this.game.isDuringChallenge({ challengeType: 'power' }),
            effect: ability.effects.setStrength(3)
        });
    }
}

TheKingsPrize.code = '27507';
TheKingsPrize.version = '1.0.0';

export default TheKingsPrize;
