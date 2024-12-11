import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ShadowAssassin extends DrawCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.registerEvents(['onCardEntersPlay', 'onPhaseEnded']);
    }

    setupCardAbilities() {
        this.reaction({
            when: {
                onCardEntersPlay: (event) => event.card === this
            },
            target: {
                cardCondition: {
                    location: 'play area',
                    type: 'character',
                    participating: true,
                    condition: (card, context) =>
                        card.getStrength() < context.event.card.getStrength()
                }
            },
            message: '{player} uses {source} to kill {target}',
            handler: (context) => {
                this.game.resolveGameAction(
                    GameActions.kill((context) => ({ card: context.target })),
                    context
                );
            }
        });
    }

    onCardEntersPlay(event) {
        if (event.card === this) {
            this.checkSacrifice();
        }
    }

    onPhaseEnded(event) {
        if (event.phase === 'challenges') {
            this.checkSacrifice();
        }
    }

    checkSacrifice() {
        if (this.location === 'play area') {
            this.game.resolveGameAction(GameActions.sacrificeCard({ card: this }));
            this.game.addMessage('{0} is sacrificed as it is not the challenges phase', this);
        }
    }
}

ShadowAssassin.code = '26506';
ShadowAssassin.version = '1.0.0';

export default ShadowAssassin;
