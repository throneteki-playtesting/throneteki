import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ArborJester extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Discard 1 gold from ' + this.name,
            cost: ability.costs.discardGold(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character'
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.revealTopCards((context) => ({
                        player: context.player
                    })).then((preThenContext) => ({
                        handler: (context) => {
                            const topCard = context.event.cards[0];
                            let traits = topCard.getTraits();
                            this.untilEndOfPhase(() => ({
                                match: this,
                                effect: traits.map((trait) => ability.effects.addTrait(trait))
                            }));

                            let str = -1;
                            if (topCard.hasPrintedCost()) {
                                str = topCard.getPrintedCost();
                                this.untilEndOfPhase((ability) => ({
                                    match: preThenContext.target,
                                    effect: ability.effects.modifyStrength(str)
                                }));
                            }
                            this.getMessage(context.player, preThenContext.target, str, traits);
                        }
                    })),
                    context
                );
            }
        });
    }

    getMessage(player, target, str, traits) {
        if (str > 0 && traits.length > 0) {
            let traitsGained = this.getTraitsString(traits);
            this.game.addMessage(
                '{0} gives {1} +{2} STR and {3} until the end of the phase',
                player,
                target,
                str,
                traitsGained
            );
        } else if (str > 0) {
            this.game.addMessage(
                '{0} gives {1} +{2} STR until the end of the phase',
                player,
                target,
                str
            );
        } else if (traits.length > 0) {
            let traitsGained = this.getTraitsString(traits);
            this.game.addMessage(
                '{0} gives {1} {2} until the end of the phase',
                player,
                target,
                traitsGained
            );
        }
    }

    getTraitsString(traits) {
        return traits.length === 1 ? ` the ${traits[0]} trait` : ` the ${traits.join(', ')} traits`;
    }
}

ArborJester.code = '00280';

export default ArborJester;
