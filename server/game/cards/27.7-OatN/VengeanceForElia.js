import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class VengeanceForElia extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCharacterKilled: (event) =>
                    event.card.controller === this.controller && event.card.isFaction('martell')
            },
            target: {
                mode: 'unlimited',
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === this.controller &&
                    card.hasTrait('Bastard')
            },
            message: '{player} plays {source} to stand {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously(
                        context.target.map((card) => GameActions.standCard({ card }))
                    ),
                    context
                );
            }
        });
    }
}

VengeanceForElia.code = '27548';
VengeanceForElia.version = '1.0.0';

export default VengeanceForElia;
