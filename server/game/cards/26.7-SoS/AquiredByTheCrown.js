import DrawCard from '../../drawcard.js';

class AquiredByTheCrown extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ type: 'location' });
        this.whileAttached({
            condition: () => this.parent.kneeled,
            effect: ability.effects.takeControl(this.controller)
        });
    }
}

AquiredByTheCrown.code = '26508';
AquiredByTheCrown.version = '1.0.0';

export default AquiredByTheCrown;
