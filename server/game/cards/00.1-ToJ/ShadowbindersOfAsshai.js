import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';

class ShadowbindersOfAsshai extends AgendaCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card.controller === this.controller
            },
            limit: ability.limit.perRound(3),
            gameAction: GameActions.choose({
                choices: {
                    'Gain 1 gold': {
                        condition: () => this.controller.canGainGold(),
                        limit: ability.limit.perRound(1), // TODO BD do limits in individual choices work?
                        gameAction: GameActions.genericHandler(() => {
                            this.game.addMessage(
                                '{0} uses {1} to gain 1 gold',
                                this.controller,
                                this
                            );
                            this.game.addGold(this.controller, 1);
                        })
                    },
                    'Draw a card': {
                        condition: () => this.controller.canDraw(),
                        cost: ability.costs.payGold(1),
                        limit: ability.limit.perRound(1),
                        gameAction: GameActions.genericHandler(() => {
                            this.controller.drawCardsToHand(1);
                            this.game.addMessage(
                                '{0} uses {1} to draw 1 card',
                                this.controller,
                                this
                            );
                        })
                    },
                    'Give character +2 STR': {
                        limit: ability.limit.perRound(1),
                        target: {
                            cardCondition: (card) =>
                                card.location === 'play area' && card.getType() === 'character'
                        },
                        gameAction: GameActions.genericHandler((context) => {
                            const str = 2;
                            this.game.addMessage(
                                '{0} uses {1} to give +{2} STR to {3} until the end of the phase',
                                this.controller,
                                this,
                                str,
                                context.target
                            );

                            this.untilEndOfPhase((ability) => ({
                                match: context.target,
                                effect: ability.effects.modifyStrength(str)
                            }));
                        })
                    }
                }
            })
        });
    }
}

ShadowbindersOfAsshai.code = '00359';

export default ShadowbindersOfAsshai;
