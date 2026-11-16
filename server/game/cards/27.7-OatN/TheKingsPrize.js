import DrawCard from '../../drawcard.js';

class TheKingsPrize extends DrawCard {
    // The King's Prize (27507)
    // Shadow (1).
    // During [power] challenges, set attached character's STR to 3.
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: (context) => context.game.isDuringChallenge({ challengeType: 'power' }),
            effect: ability.effects.setStrength(3)
        });
    }
}

TheKingsPrize.code = '27507';
TheKingsPrize.version = '1.0.0';

export default TheKingsPrize;
