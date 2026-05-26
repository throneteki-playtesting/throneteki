import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheWall extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.moreWinterThanSummerPlotsRevealed(),
            match: (card) => card.getType() === 'character',
            targetController: 'any',
            effect: ability.effects.modifyStrength(-1)
        });
        this.reaction({
            when: {
                onPhaseStarted: (event) =>
                    event.phase === 'standing' && this.getCharactersWithLowestStr().length > 0
            },
            cost: ability.costs.kneelSelf(),
            message: {
                format: '{player} kneels {costs.kneel} to prevent {characters} from standing this phase',
                args: { characters: () => this.getCharactersWithLowestStr() }
            },
            gameAction: GameActions.genericHandler(() => {
                const cards = this.getCharactersWithLowestStr();
                this.untilEndOfPhase((ability) => ({
                    match: cards,
                    effect: ability.effects.cannotBeStood()
                }));
            })
        });
    }
    moreWinterThanSummerPlotsRevealed() {
        let winterPlots = this.game
            .getPlayers()
            .filter((player) => player.activePlot && player.activePlot.hasTrait('Winter'));
        let summerPlots = this.game
            .getPlayers()
            .filter((player) => player.activePlot && player.activePlot.hasTrait('Summer'));

        return winterPlots.length > summerPlots.length;
    }
    getCharactersWithLowestStr() {
        const lowestStrCharacters = this.game
            .filterCardsInPlay((card) => card.getType() === 'character')
            .reduce((lowest, card) => {
                const currentStr = lowest[0]?.getStrength();
                if (!currentStr || currentStr === card.getStrength()) {
                    lowest.push(card);
                } else if (card.getStrength() < currentStr) {
                    lowest = [card];
                }
                return lowest;
            }, [])
            .filter((card) => card.controller !== this.controller);
        return lowestStrCharacters;
    }
}

TheWall.code = '27510';
TheWall.version = '1.0.1';

export default TheWall;
