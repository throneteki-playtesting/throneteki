import PlotCard from '../../plotcard.js';

class CityOfIce extends PlotCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.attackingPlayer === event.challenge.winner
            },
            player: () =>
                this.hasTwoUsedCityPlots(this.controller) &&
                this.game.currentChallenge.winner === this.controller
                    ? this.controller
                    : this.game.currentChallenge.winner,
            target: {
                activePromptTitle: 'Choose an attacking character',
                cardCondition: (card) =>
                    card.getType() === 'character' &&
                    card.location === 'play area' &&
                    card.isAttacking()
            },
            limit: ability.limit.perPhase(2),
            handler: (context) => {
                context.target.modifyPower(1);
                this.game.addMessage(
                    '{0} uses {1} to have {2} gain 1 power',
                    context.player,
                    this,
                    context.target
                );
            }
        });
    }

    hasTwoUsedCityPlots(player) {
        return player.getNumberOfUsedPlotsByTrait('City') > 1;
    }
}

CityOfIce.code = '00332';

export default CityOfIce;
