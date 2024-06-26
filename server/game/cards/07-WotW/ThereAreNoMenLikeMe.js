import DrawCard from '../../drawcard.js';

class ThereAreNoMenLikeMe extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: "Select character that doesn't kneel for military challenges",
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.hasTrait('knight')
            },
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.target,
                    effect: [
                        ability.effects.doesNotKneelAsAttacker({ challengeType: 'military' }),
                        ability.effects.doesNotKneelAsDefender({ challengeType: 'military' })
                    ]
                }));

                this.game.addMessage(
                    '{0} uses {1} to not kneel {2} when declared in military challenges this phase',
                    context.player,
                    this,
                    context.target
                );
            }
        });
    }
}

ThereAreNoMenLikeMe.code = '07030';

export default ThereAreNoMenLikeMe;
