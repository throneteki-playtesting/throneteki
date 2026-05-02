import DrawCard from '../../drawcard.js';
import TextHelper from '../../TextHelper.js';

class NorthernMountainClans extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isAttacking()
            },
            handler: (context) => {
                let xValue = context.xValue;
                this.game.promptForSelect(context.player, {
                    mode: 'exactly',
                    numCards: xValue,
                    activePromptTitle: `Select ${TextHelper.count(xValue, 'character')}`,
                    source: this,
                    cardCondition: (card) =>
                        card.location === 'play area' && card.getType() === 'character',
                    onSelect: (player, cards) => this.targetsSelected(player, cards, xValue)
                });
            }
        });
    }

    targetsSelected(player, cards, xValue) {
        // Technically incorrect; should only prevent standing DURING THE STANDING PHASe
        this.untilEndOfRound((ability) => ({
            match: cards,
            effect: ability.effects.cannotBeStood()
        }));

        this.game.addMessage(
            '{0} uses {1} to prevent {2} from standing',
            player,
            this,
            xValue,
            cards
        );

        return true;
    }
}

NorthernMountainClans.code = '27504';
NorthernMountainClans.version = '1.0.0';

export default NorthernMountainClans;
