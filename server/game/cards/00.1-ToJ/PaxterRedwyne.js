import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class PaxterRedwyne extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            initiative: 1
        });

        this.reaction({
            when: {
                onCardPlayed: (event) =>
                    event.card.getType() === 'event' && event.card.controller === this.controller
            },
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character'
            },
            handler: (context) => {
                const str = 1;
                context.game.resolveGameAction(
                    GameActions.choose({
                        title: (context) => `Choose keyword for ${context.target.name} to gain`,
                        message: {
                            format: '{player} kneels {source} to give {target} +{strength} STR and {keyword} until the end of the phase',
                            args: {
                                strength: str,
                                keyword: (context) => context.selectedChoice.text.toLowerCase()
                            }
                        },
                        choices: {
                            Renown: GameActions.genericHandler((context) =>
                                this.gainKeywordAndSTR(context, 'renown', str)
                            ),
                            Insight: GameActions.genericHandler((context) =>
                                this.gainKeywordAndSTR(context, 'insight', str)
                            )
                        }
                    }),
                    context
                );
            }
        });
    }

    gainKeywordAndSTR(context, keyword, str) {
        this.untilEndOfPhase((ability) => ({
            match: context.target,
            effect: [ability.effects.addKeyword(keyword), ability.effects.modifyStrength(str)]
        }));
        return true;
    }
}

PaxterRedwyne.code = '00266';

export default PaxterRedwyne;
