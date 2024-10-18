import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Myr extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Put into play',
            phase: 'challenge',
            target: {
                cardCondition: {
                    location: 'shadows',
                    controller: 'current',
                    condition: (card) => card.isOutOfFaction()
                }
            },
            cost: ability.costs.kneelSelf(),
            message: '{player} kneels {source} to put {target} into play from shadows',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.putIntoPlay((context) => ({
                        card: context.target
                    })).thenExecute((event) => {
                        this.atEndOfPhase((ability) => ({
                            match: event.card,
                            condition: () =>
                                ['play area', 'duplicate'].includes(event.card.location),
                            targetLocation: 'any',
                            effect: ability.effects.discardIfStillInPlay(true)
                        }));
                    }),
                    context
                );
            }
        });
    }
}

Myr.code = '26605';
Myr.version = '1.0.0';

export default Myr;
