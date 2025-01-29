import DrawCard from '../../drawcard.js';

class SouthboundGalley extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            initiative: 1
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    defending: true,
                    printedStrengthOrLower: 4
                }
            },
            message:
                "{player} uses {source} to have {target} not contribute it's STR to this challenge",
            handler: (context) => {
                this.untilEndOfChallenge((ability) => ({
                    match: context.target,
                    effect: ability.effects.doesNotContributeStrength()
                }));
            }
        });
    }
}

SouthboundGalley.code = '26522';
SouthboundGalley.version = '1.1.0';

export default SouthboundGalley;
