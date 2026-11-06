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
                    card !== this &&
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    this.getTraits().some((trait) => card.hasTrait(trait))
            },
            message: '{player} uses {source} to stand {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.standCard((context) => ({ card: context.target })),
                    context
                );
                if (context.target.isDefending()) {
                    this.game.addMessage(
                        '{0} uses {1} to give {2} Renown until end of phase',
                        context.player,
                        this,
                        context.target
                    );
                    this.untilEndOfPhase((ability) => ({
                        match: context.target,
                        effect: ability.effects.addKeyword('renown')
                    }));
                }
            }
        });
    }
}

TheMermansShield.code = '27564';
TheMermansShield.version = '1.1.1';

export default TheMermansShield;
