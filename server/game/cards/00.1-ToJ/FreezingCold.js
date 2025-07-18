import PlotCard from '../../plotcard.js';

class FreezingCold extends PlotCard {
    setupCardAbilities() {
        this.whenRevealed({
            handler: () => {
                let kneelCharacters = this.game.filterCardsInPlay(
                    (card) => card.getType() === 'character' && card.getPrintedCost() <= 3
                );

                if (kneelCharacters.length > 0) {
                    for (let card of kneelCharacters) {
                        card.controller.kneelCard(card);
                    }
                    this.game.addMessage(
                        '{0} uses {1} to kneel each character with printed cost 3 or lower',
                        this.controller
                    );
                }
            }
        });
    }
}

FreezingCold.code = '00375';

export default FreezingCold;
