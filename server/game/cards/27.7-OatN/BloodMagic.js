import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class BloodMagic extends PlotCard {
    // Blood Magic (27615)
    // When Revealed: Kill a unique character you control. Then, choose another unique non-Army
    // character in your dead pile and put it into play.
    setupCardAbilities() {
        this.whenRevealed({
            target: {
                type: 'select',
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.controller === context.player &&
                    card.getType() === 'character' &&
                    card.isUnique(),
                gameAction: GameActions.kill((context) => ({ card: context.target })).then({
                    target: {
                        type: 'select',
                        cardCondition: (card, context) =>
                            card.location === 'dead pile' &&
                            card.controller === context.player &&
                            card.getType() === 'character' &&
                            card.isUnique() &&
                            !card.hasTrait('Army') &&
                            card !== context.parentContext.target,
                        gameAction: GameActions.putIntoPlay((context) => ({
                            card: context.target
                        }))
                    },
                    message: 'Then {player} puts {target} into play from their dead pile'
                })
            },
            message: '{player} uses {source} to kill {target}'
        });
    }
}

BloodMagic.code = '27615';
BloodMagic.version = '1.0.1';

export default BloodMagic;
