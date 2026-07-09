import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class SuperstitiousSteward extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onPhaseStarted: (event) => event.phase === 'plot'
            },
            limit: ability.limit.perRound(1),
            handler: (context) => {
                this.context = context;
                this.game.promptWithMenu(context.player, this, {
                    activePrompt: {
                        menuTitle: 'Name a trait',
                        controls: [
                            {
                                type: 'trait-name',
                                command: 'menuButton',
                                method: 'selectTraitName'
                            }
                        ]
                    },
                    source: this
                });
            }
        });
    }

    selectTraitName(player, traitName) {
        this.game.addMessage('{0} uses {1} and names the {2} trait', player, this, traitName);
        this.namedTrait = traitName;
        this.game.once('onPlotsRevealed', (event) => this.handlePlotsRevealed(event));
        return true;
    }

    handlePlotsRevealed(event) {
        if (!this.namedTrait) {
            delete this.context;
            return;
        }

        const affectedOpponents = event.plots
            .filter((plot) => plot.controller !== this.controller && plot.hasTrait(this.namedTrait))
            .map((plot) => plot.controller);

        for (const opponent of affectedOpponents) {
            this.game.addMessage(
                '{0} is forced by {1} to sacrifice a character or location due to revealing a plot with the {2} trait',
                opponent,
                this,
                this.namedTrait
            );
            this.promptSacrifice(opponent);
        }

        delete this.namedTrait;
        delete this.context;
    }

    promptSacrifice(player) {
        this.game.promptForSelect(player, {
            activePromptTitle: 'Select a character or location to sacrifice',
            cardCondition: (card) =>
                card.location === 'play area' &&
                card.controller === player &&
                (card.getType() === 'character' || card.getType() === 'location') &&
                GameActions.sacrificeCard({ card, player }).allow(),
            onSelect: (player, card) => this.onSacrificeSelected(player, card),
            source: this
        });
    }

    onSacrificeSelected(player, card) {
        this.game.addMessage('{0} sacrifices {1}', player, card);
        this.game.resolveGameAction(GameActions.sacrificeCard({ card, player }));
        return true;
    }
}

SuperstitiousSteward.code = '27553';
SuperstitiousSteward.version = '1.1.0';

export default SuperstitiousSteward;
