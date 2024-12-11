import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WhenAllIsDarkest extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event) =>
                    this.game.isDuringChallenge() &&
                    event.card.getType() === 'character' &&
                    GameActions.takeControl({
                        player: this.controller,
                        card: event.card
                    }).allow() &&
                    // This should REALLY be a check for "takeControl", as you can't take control of something you already control
                    event.card.controller !== this.controller
            },
            cost: ability.costs.kneelFactionCard(),
            message: {
                format: '{player} plays {source} and kneels their faction card to take control of {card}',
                args: { card: (context) => context.event.card }
            },
            gameAction: GameActions.takeControl((context) => ({
                player: context.player,
                card: context.event.card
            }))
        });
    }
}

WhenAllIsDarkest.code = '26560';
WhenAllIsDarkest.version = '1.0.0';

export default WhenAllIsDarkest;
