import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';

class Yunkai extends DrawCard {
    // Yunkai (27581)
    // Action: Kneel Yunkai and discard a card from your hand to choose up to 2 participating
    // characters. Until the end of the phase, each of those characters get -1 STR and you draw 1
    // card if it is killed.
    setupCardAbilities(ability) {
        this.action({
            title: 'Give up to 2 participating characters -1 STR',
            phase: 'challenge',
            cost: [ability.costs.kneelSelf(), ability.costs.discardFromHand()],
            target: {
                mode: 'upTo',
                numCards: 2,
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating()
            },
            message:
                '{player} kneels {source} and discards {costs.discardFromHand} from their hand to give {target} -1 STR until the end of the phase',
            gameAction: GameActions.simultaneously((context) =>
                context.target.flatMap((card) => [
                    GameActions.lastingEffect(() => ({
                        duration: 'untilEndOfPhase',
                        match: card,
                        effect: ability.effects.modifyStrength(-1)
                    })),
                    GameActions.delayedEffect(() => ({
                        duration: 'untilEndOfPhase',
                        title: card.name,
                        when: { onCharacterKilled: (event) => event.card === card },
                        message: '{player} uses {source} to draw 1 card',
                        gameAction: GameActions.drawCards((delayedContext) => ({
                            player: delayedContext.player,
                            amount: 1
                        }))
                    }))
                ])
            )
        });
    }
}

Yunkai.code = '27581';
Yunkai.version = '1.1.1';

export default Yunkai;
