import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class WeddingAtTheWall extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Stand characters',
            phase: 'marshal',
            cost: ability.costs.discardFromShadows(),
            message: {
                format: '{player} plays {source} and discards {costs.discardFromShadows} from shadows to stand {characters}',
                args: { characters: () => this.getStandingCharacters() }
            },
            gameAction: GameActions.simultaneously(() =>
                this.getStandingCharacters().map((card) => GameActions.standCard({ card }))
            )
        });
    }

    getStandingCharacters() {
        return this.game.filterCardsInPlay(
            (card) =>
                card.getType() === 'character' &&
                (card.hasTrait("R'hllor") || card.hasTrait('Wildling')) &&
                GameActions.standCard({ card }).allow()
        );
    }
}

WeddingAtTheWall.code = '27512';
WeddingAtTheWall.version = '1.0.0';

export default WeddingAtTheWall;
