import { Tokens } from '../../Constants/Tokens.js';
import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class AshemarkCouncilor extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.dynamicStrength(() => this.getSTR())
        });

        this.reaction({
            when: {
                onCardEntersPlay: (event) => event.card === this
            },
            target: {
                activePromptTitle: 'Select up to 3 cards',
                cardCondition: (card) =>
                card.location === 'play area' && card.tokens[Tokens.gold] === 0,
                multiSelect = true,
                numCards: '3',
                
            },
            message: '{player} uses {source} to have {target} each gain 1 gold',
            handler: (context) => {
                for (let card of context.target) {
                    card.modifyToken(Tokens.gold, 1);
            }
        });
    }

    getSTR() {
        return this.game.getNumberOfCardsInPlay((card) => card.tokens[Tokens.gold] >= 1);
    }
}

AshemarkCouncilor.code = '26528';
AshemarkCouncilor.version = '1.0.1';

export default AshemarkCouncilor;
