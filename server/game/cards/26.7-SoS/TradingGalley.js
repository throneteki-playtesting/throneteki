import DrawCard from '../../drawcard.js';

class TradingGalley extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            gold: 1
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    participating: true
                }
            },
            message:
                '{player} uses {source} to give +3 STR to {target} until the end of the challenge',
            handler: (context) => {
                this.untilEndOfChallenge((ability) => ({
                    match: context.target,
                    effect: ability.effects.modifyStrength(3)
                }));
            }
        });
    }
}

TradingGalley.code = '26594';
TradingGalley.version = '1.1.0';

export default TradingGalley;
