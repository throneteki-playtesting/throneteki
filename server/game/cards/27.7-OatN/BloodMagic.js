import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class BloodMagic extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            target: {
                type: 'select',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    type: 'character',
                    unique: true,
                    condition: (card) => GameActions.kill({ card }).allow()
                }
            },
            message: '{player} uses {source} to kill {target}',
            handler: (context) => {
                this.resolveGameAction(
                    GameActions.kill((context) => ({ card: context.target })).then({
                        target: {
                            cardCondition: {
                                location: 'dead pile',
                                controller: 'current',
                                type: 'character',
                                unique: true,
                                not: { trait: 'Army' },
                                condition: (card, context) =>
                                    card !== context.parentContext.target &&
                                    GameActions.putIntoPlay({ card }).allow()
                            }
                        },
                        message: 'Then, {player} puts {target} into play from their dead pile',
                        handler: (context) => {
                            this.resolveGameAction(
                                GameActions.putIntoPlay((context) => ({ card: context.target })),
                                context
                            );
                        }
                    }),
                    context
                );
            }
        });
    }
}

BloodMagic.code = '27615';
BloodMagic.version = '1.0.1';

export default BloodMagic;
