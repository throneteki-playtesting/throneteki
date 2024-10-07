import DrawCard from '../../drawcard.js';

class TheRegentsCouncil extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Have character gain trait and not kneel to attack',
            condition: () =>
                this.controller.anyCardsInPlay({
                    or: [{ trait: 'King' }, { name: 'Cersei Lannister' }]
                }),
            target: {
                cardCondition: { type: 'character', controller: 'current' }
            },
            message:
                '{player} plays {source} to have {target} gain the Small Council trait and not kneel when declared as an attacker until the end of the phase',
            handler: (context) => {
                this.untilEndOfPhase((ability) => ({
                    match: context.event.target,
                    effect: [
                        ability.effects.addTrait('Small Council'),
                        ability.effects.doesNotKneelAsAttacker()
                    ]
                }));
                this.atEndOfPhase((ability) => ({
                    match: context.event.card,
                    condition: () =>
                        ['play area', 'duplicate'].includes(context.event.card.location),
                    targetLocation: 'any',
                    effect: ability.effects.discardIfStillInPlay(false)
                }));
            }
        });
    }
}

TheRegentsCouncil.code = '26536';
TheRegentsCouncil.version = '1.0.0';

export default TheRegentsCouncil;
