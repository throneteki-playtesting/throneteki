import DrawCard from '../../drawcard.js';

class ArborJester extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character'
            },
            handler: (context) => {
                let strBoost = context.player.shadows.length;
                context.target.modifyStrength(strBoost);
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: ability.effects.addKeyword('insight')
                }));

                this.game.addMessage(
                    '{0} uses {1} to give {2} +{3} STR and insight',
                    this.controller,
                    this,
                    context.target,
                    strBoost
                );
            }
        });
    }
}

ArborJester.code = '00280';

export default ArborJester;
