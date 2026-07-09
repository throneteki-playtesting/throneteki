import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheMermansShield extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating() &&
                    card.kneeled &&
                    this.getTraits().some((trait) => card.hasTrait(trait))
            },
            message: '{player} uses {source} to stand {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.standCard((context) => ({ card: context.target })),
                    context
                );
                this.game.addMessage(
                    '{0} uses {1} to give {2} and {1} Renown until end of phase',
                    this.controller,
                    this,
                    context.target
                );
                this.untilEndOfPhase((ability) => ({
                    match: [this, context.target],
                    effect: ability.effects.addKeyword('renown')
                }));
            }
        });
    }
}

TheMermansShield.code = '27564';
TheMermansShield.version = '1.1.0';

export default TheMermansShield;
