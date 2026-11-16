import DrawCard from '../../drawcard.js';
import CardEntersPlayTracker from '../../EventTrackers/CardEntersPlayTracker.js';

class WormwaySentinels extends DrawCard {
    // Wormway Sentinels (27552)
    // Shadow (5). No attachments except Weapon.
    // Wormway Sentinels may be declared as a defender during [intrigue] or [power] challenges (even
    // while kneeling if it came out of shadows this phase).
    setupCardAbilities(ability) {
        const tracker = CardEntersPlayTracker.forPhase(this.game);
        const isDefendingIntrigueOrPower = (context) =>
            context.game.isDuringChallenge({
                challengeType: ['intrigue', 'power'],
                defendingPlayer: context.source.controller
            });

        this.persistentEffect({
            condition: isDefendingIntrigueOrPower,
            match: (card, context) => card === context.source,
            effect: ability.effects.canBeDeclaredWithoutIcon()
        });

        this.persistentEffect({
            condition: (context) =>
                isDefendingIntrigueOrPower(context) && tracker.hasComeOutOfShadows(context.source),
            match: (card, context) => card === context.source,
            effect: ability.effects.canBeDeclaredWhileKneeling()
        });
    }
}

WormwaySentinels.code = '27552';
WormwaySentinels.version = '1.1.0';

export default WormwaySentinels;
