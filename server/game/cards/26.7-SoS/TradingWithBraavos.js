import AgendaCard from '../../agendacard.js';
import GameActions from '../../GameActions/index.js';

class TradingWithBraavos extends AgendaCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event) =>
                    event.card.controller === this.controller &&
                    event.card.getType() === 'location' &&
                    (event.card.isFaction('neutral') ||
                        !event.card.isFaction(this.controller.faction.getPrintedFaction()))
            },
            limit: ability.limit.perPhase(1),
            message: '{player} uses {source} to draw 1 card',
            gameAction: GameActions.drawCards((context) => ({ player: context.player, amount: 1 }))
        });
    }
}

TradingWithBraavos.code = '26620';
TradingWithBraavos.version = '1.0.0';

export default TradingWithBraavos;
