import DrawCard from '../../drawcard.js';

class WhiteKnifeBarge extends DrawCard {
    setupCardAbilities() {
        this.plotModifiers({
            initiative: 1
        });
        this.reaction({
            when: {
                onCardOutOfShadows: (event) => event.card === this
            },
            message: '{player} uses {source} to name a card',
            handler: (context) => {
                this.game.promptForCardName({
                    player: context.player,
                    onSelect: (player, cardName) => this.selectCardName(cardName, context),
                    source: context.source
                });
            }
        });
    }

    selectCardName(cardName) {
        this.game.addMessage('Until the end of the phase, {0} cannot be sacrificed', cardName);
        this.untilEndOfPhase((ability) => ({
            match: (card) => card.name === cardName,
            effect: ability.effects.cannotBeSacrificed()
        }));
    }
}

WhiteKnifeBarge.code = '26570';
WhiteKnifeBarge.version = '1.0.0';

export default WhiteKnifeBarge;
