import PlotCard from '../../plotcard.js';

class RazedToTheGround extends PlotCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.isDuringChallenge({ challengeType: 'military' }),
            match: this,
            effect: ability.effects.modifyClaim(1)
        });
    }
}

RazedToTheGround.code = '00371';

export default RazedToTheGround;
