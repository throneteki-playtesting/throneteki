import DrawCard from '../../drawcard.js';
import GameActions from '../../GameActions/index.js';
import GenericTracker from '../../EventTrackers/GenericTracker.js';

const isAlone = (card, game) => {
    const challenge = game.currentChallenge;
    if (!challenge) {
        return false;
    }
    if (card.isAttacking()) {
        return challenge.attackers.length === 1;
    }
    if (card.isDefending()) {
        return challenge.defenders.length === 1;
    }
    return false;
};

class ArborLongship extends DrawCard {
    // Arbor Longship (27594)
    // Shadow (1).
    // Action: Kneel Arbor Longship to choose a character that is attacking or defending alone.
    // Until the end of the challenge, it gets +2 STR. Then, if Arbor Longship came out of shadows
    // this phase, stand that character.
    setupCardAbilities(ability) {
        const tracker = GenericTracker.forPhase(this.game, 'onCardOutOfShadows');

        this.action({
            title: 'Give solo character +2 STR',
            phase: 'challenge',
            cost: ability.costs.kneelSelf(),
            condition: (context) => context.game.isDuringChallenge(),
            target: {
                cardCondition: (card, context) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.isParticipating() &&
                    isAlone(card, context.game),
                gameAction: GameActions.simultaneously([
                    GameActions.lastingEffect((context) => ({
                        duration: 'untilEndOfChallenge',
                        match: context.target,
                        effect: ability.effects.modifyStrength(2)
                    })),
                    GameActions.ifCondition({
                        condition: (context) =>
                            tracker.some((event) => event.card === context.source),
                        thenAction: GameActions.standCard((context) => ({
                            card: context.target
                        }))
                    })
                ])
            },
            message:
                '{player} kneels {source} to give {target} +2 STR until the end of the challenge'
        });
    }
}

ArborLongship.code = '27594';
ArborLongship.version = '2.0.0';

export default ArborLongship;
