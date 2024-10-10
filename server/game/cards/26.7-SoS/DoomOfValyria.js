import GameActions from '../../GameActions/index.js';
import PlotCard from '../../plotcard.js';

class DoomOfValyria extends PlotCard {
    setupCardAbilities() {
        const getPrintedCost = (card) => (card.location === 'shadows' ? 2 : card.getPrintedCost());

        const getUnchosenCards = (locations, context) => {
            const chosenCards = context.targets.getTargets();
            return context.game.allCards.filter(
                (card) => locations.includes(card.location) && !chosenCards.includes(card)
            );
        };

        const simultaneouslyForUnchosenCards = (locations, gameActionFunc) =>
            GameActions.simultaneously((context) =>
                getUnchosenCards(locations, context).map(gameActionFunc)
            );

        this.whenRevealed({
            target: {
                choosingPlayer: 'each',
                optional: true,
                ifAble: true,
                activePromptTitle: 'Select card(s)',
                maxStat: () => 14,
                cardStat: getPrintedCost,
                cardCondition: {
                    location: ['play area', 'shadows'],
                    controller: 'choosingPlayer'
                }
            },
            message: (context) => {
                const unchosenCards = getUnchosenCards(['shadows', 'play area'], context);
                for (const player of context.game.getPlayersInFirstPlayerOrder()) {
                    const cardsForPlayer = unchosenCards.filter((card) => card.owner === player);
                    if (cardsForPlayer.length > 0) {
                        this.game.addMessage(
                            '{0} discards {1} for {2}',
                            player,
                            cardsForPlayer,
                            this
                        );
                    } else {
                        this.game.addMessage(
                            '{0} does not discard any cards for {1}',
                            player,
                            this
                        );
                    }
                }
            },
            handler: (context) => {
                this.game.resolveGameAction(
                    simultaneouslyForUnchosenCards(['shadows', 'play area'], (card) =>
                        GameActions.discardCard({ card, allowSave: false })
                    ),
                    context
                );
            }
        });
    }
}

DoomOfValyria.code = '26612';
DoomOfValyria.version = '1.0.0';

export default DoomOfValyria;
