import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class TheodanTheTrue extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    this.isParticipating() && event.challenge.isMatch({ winner: this.controller })
            },
            target: {
                cardCondition: {
                    type: 'character',
                    trait: 'The Seven'
                }
            },
            message: '{player} uses {source} to give {target} renown or insight',
            limit: ability.limit.perPhase(2),
            handler: (context) => {
                this.resolveGameAction(
                    GameActions.choose({
                        title: (context) => `Choose keyword for ${context.source.name}`,
                        message: {
                            format: '{player} chooses to have {target} gain {keyword} until the end of the phase',
                            args: {
                                keyword: (context) => context.selectedChoice.text.toLowerCase()
                            }
                        },
                        choices: {
                            Renown: GameActions.genericHandler((context) =>
                                this.gainKeyword(context.selectedChoice.text.toLowerCase())
                            ),
                            Insight: GameActions.genericHandler((context) =>
                                this.gainKeyword(context.selectedChoice.text.toLowerCase())
                            )
                        }
                    }),
                    context
                );
            }
        });
    }

    gainKeyword(keyword) {
        this.untilEndOfChallenge((ability) => ({
            match: this,
            effect: ability.effects.addKeyword(keyword)
        }));
        return true;
    }
}

TheodanTheTrue.code = '27597';
TheodanTheTrue.version = '1.1.0';

export default TheodanTheTrue;
