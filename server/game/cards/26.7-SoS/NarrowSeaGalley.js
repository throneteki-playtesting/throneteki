import { Tokens } from '../../Constants/Tokens.js';
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class NarrowSeaGalley extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    participating: true,
                    condition: (card) =>
                        card.getStrength() <= 1 && GameActions.putIntoShadows({ card }).allow()
                }
            },
            message:
                '{player} uses {source} to place {target} in shadows with a shadow token on it',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.simultaneously([
                        GameActions.putIntoShadows((context) => ({ card: context.target })),
                        GameActions.placeToken((context) => ({
                            card: context.target,
                            token: Tokens.shadow
                        })),
                        GameActions.genericHandler((context) => {
                            this.lastingEffect((ability) => ({
                                condition: () => context.target.location === 'shadows',
                                targetLocation: 'any',
                                match: context.target,
                                effect: ability.effects.addKeyword(
                                    `Shadow (${context.target.getPrintedCost()})`
                                )
                            }));
                        })
                    ]),
                    context
                );
            }
        });
    }
}

NarrowSeaGalley.code = '26509';
NarrowSeaGalley.version = '1.0.0';

export default NarrowSeaGalley;
