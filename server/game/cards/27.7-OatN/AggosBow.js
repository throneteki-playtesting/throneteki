import DrawCard from '../../drawcard.js';

class AggosBow extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ trait: 'Dothraki' });
        this.whileAttached({
            match: (card) => card.name === 'Aggo',
            effect: ability.effects.addKeyword('stealth')
        });
        this.action({
            title: 'Kneel attached to participate',
            condition: () => this.game.isDuringChallenge({ challengeType: 'military' }),
            cost: ability.costs.kneelParent(),
            message:
                '{player} uses {source} and kneels {costs.kneel} to have {costs.kneel} participate in the challenge',
            handler: (context) => {
                let card = context.costs.kneel;
                this.game.currentChallenge.addParticipantToSide(context.player, card);
            }
        });
    }
}

AggosBow.code = '27579';
AggosBow.version = '1.0.0';

export default AggosBow;
