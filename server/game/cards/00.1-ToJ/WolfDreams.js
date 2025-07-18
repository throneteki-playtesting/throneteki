import DrawCard from '../../drawcard.js';

class WolfDreams extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Select a character',
            phase: 'challenge',
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isAttacking() &&
                    card.controller === this.controller
            },
            handler: (context) => {
                this.context = context;

                this.game.promptWithMenu(context.player, this, {
                    activePrompt: {
                        menuTitle: 'Name a trait',
                        controls: [
                            { type: 'trait-name', command: 'menuButton', method: 'selectTraitName' }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    selectTraitName(player, traitName) {
        const str = 2;
        this.untilEndOfPhase((ability) => ({
            match: this.context.target,
            effect: ability.effects.modifyStrength(str)
        }));
        this.game.addMessage(
            '{0} plays {1} to give {2} +{3} STR until the end of the challenge',
            player,
            this,
            this.context.target,
            str
        );

        if (this.controller.canAttach(this, this.context.target)) {
            this.controller.attach(this.controller, this, this.context.target, 'play');
            this.lastingEffect((ability) => ({
                condition: () => !!this.parent,
                targetLocation: 'any',
                match: this,
                effect: [
                    ability.effects.setCardType('attachment'),
                    ability.effects.addKeyword('Terminal')
                ]
            }));

            this.lastingEffect((ability) => ({
                condition: () => this.location === 'play area',
                targetLocation: 'any',
                targetController: 'any',
                match: (card) => card === this.parent,
                effect: ability.effects.addTrait(traitName)
            }));
        }

        return true;
    }

    // Explicitly override since it has printed type 'event'.
    // TODO BD clarify if this is supposed to keep printed traits or should be changed to become a Direwolf attachment
    canAttach(player, card) {
        return card.getType() === 'character';
    }
}

WolfDreams.code = '00238';

export default WolfDreams;
