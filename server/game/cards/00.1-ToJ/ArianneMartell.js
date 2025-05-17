import DrawCard from '../../drawcard.js';

class ArianneMartell extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Remove and gain icon',
            cost: ability.costs.returnSelfToHand(),
            target: {
                cardCondition: (card) =>
                    card.location === 'play area' && card.getType() === 'character'
            },
            handler: (context) => {
                this.game.promptForIcon(this.controller, this, (icon) => {
                    this.untilEndOfPhase((ability) => ({
                        match: context.target,
                        effect: ability.effects.removeIcon(icon)
                    }));

                    let nonMartellChars = this.controller.filterCardsInPlay(
                        (card) => card.getType() === 'character' && !card.isFaction('martell')
                    );
                    this.untilEndOfPhase((ability) => ({
                        match: nonMartellChars,
                        effect: ability.effects.addIcon(icon)
                    }));

                    this.game.addMessage(
                        '{0} returns {1} to their hand to remove {2} {3} icon from {4} and have each non-Martell character they control gain it',
                        this.controller,
                        this,
                        icon === 'intrigue' ? 'an' : 'a',
                        icon,
                        context.target
                    );
                });
            }
        });
    }
}

ArianneMartell.code = '00172';

export default ArianneMartell;
