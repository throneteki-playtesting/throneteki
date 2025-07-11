import DrawCard from '../../drawcard.js';

class TheTowerOfJoy extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () =>
                this.game.isDuringChallenge({
                    match: (challenge) => challenge.hasSingleParticipant(this.controller)
                }),
            match: (card) =>
                card.isUnique() && card.getType() === 'character' && card.isParticipating(),
            effect: ability.effects.modifyStrength(2)
        });

        this.reaction({
            when: {
                onCardLeftPlay: (event) =>
                    event.card.getType() === 'character' &&
                    event.card.isUnique() &&
                    this.allowGameAction('gainPower')
            },
            limit: ability.limit.perPhase(1),
            handler: () => {
                this.game.addMessage(
                    '{0} gains 1 power from a unique character leaving play',
                    this.controller
                );

                this.modifyPower(1);
            }
        });
    }
}

TheTowerOfJoy.code = '00292';

export default TheTowerOfJoy;
