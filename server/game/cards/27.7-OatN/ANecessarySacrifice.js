import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class ANecessarySacrifice extends DrawCard {
    // A Necessary Sacrifice (27571)
    // Interrupt: When a non-[stark] character would be killed, save it. Then, sacrifice another
    // character.
    setupCardAbilities() {
        this.interrupt({
            canCancel: true,
            would: true,
            when: {
                onCharacterKilled: (event) => event.allowSave && !event.card.isFaction('stark')
            },
            message: {
                format: '{player} plays {source} to save {character}',
                args: { character: (context) => context.event.card }
            },
            gameAction: GameActions.saveCard((context) => ({ event: context.event })).then({
                message: 'Then {player} sacrifices another character',
                gameAction: GameActions.chooseCards({
                    title: 'Select another character',
                    cardCondition: (card, context) =>
                        card.location === 'play area' &&
                        card.getType() === 'character' &&
                        card.controller === context.choosingPlayer &&
                        card !== context.parentContext.event.card,
                    gameAction: (card) => GameActions.sacrificeCard({ card })
                })
            })
        });
    }
}

ANecessarySacrifice.code = '27571';
ANecessarySacrifice.version = '1.0.0';

export default ANecessarySacrifice;
