import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class IntoTheLists extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            target: {
                choosingPlayer: 'each',
                optional: true,
                ifAble: true,
                activePromptTitle: 'Select a character to kneel',
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.choosingPlayer &&
                    !card.kneeled &&
                    !card.hasTrait('Army') &&
                    card.hasIcon('military'),
                gameAction: 'kneel'
            },
            message: '{player} uses {source} to have each player kneel a character',
            handler: (context) => {
                const knelt = context.targets.getTargets();

                if (knelt.length === 0) {
                    return;
                }

                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        knelt.map((card) => GameActions.kneelCard({ card }))
                    ),
                    context
                );

                this.game.queueSimpleStep(() => {
                    const champion = this.getChampion(knelt);

                    if (!champion) {
                        return;
                    }

                    this.game.addMessage(
                        '{0} uses {1} to have {2} gain 2 power',
                        context.player,
                        this,
                        champion
                    );
                    this.game.resolveGameAction(
                        GameActions.gainPower({ card: champion, amount: 2 }),
                        context
                    );
                });
            }
        });
    }

    getChampion(knelt) {
        const inPlay = knelt.filter((card) => card.location === 'play area');

        if (inPlay.length === 0) {
            return undefined;
        }

        const highestStrength = Math.max(...inPlay.map((card) => card.getStrength()));
        const champions = inPlay.filter((card) => card.getStrength() === highestStrength);

        return champions.length === 1 ? champions[0] : undefined;
    }
}

IntoTheLists.code = '27611';
IntoTheLists.version = '1.0.1';

export default IntoTheLists;
