import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class VengeanceForElia extends DrawCard {
    // Vengeance for Elia (27548)
    // Reaction: After a [martell] character you control is killed, choose and stand any number of
    // Bastard characters you control.
    setupCardAbilities() {
        this.reaction({
            when: {
                onCharacterKilled: (event, context) =>
                    event.card.controller === context.player && event.card.isFaction('martell')
            },
            target: {
                mode: 'unlimited',
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.controller === context.player &&
                    card.kneeled &&
                    card.hasTrait('Bastard')
            },
            message: '{player} plays {source} to stand {target}',
            gameAction: GameActions.simultaneously((context) =>
                context.target.map((card) => GameActions.standCard({ card }))
            )
        });
    }
}

VengeanceForElia.code = '27548';
VengeanceForElia.version = '1.0.0';

export default VengeanceForElia;
