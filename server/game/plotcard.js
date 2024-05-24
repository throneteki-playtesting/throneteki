import BaseCard from './basecard.js';
import CardWhenRevealed from './cardwhenrevealed.js';

class PlotCard extends BaseCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.reserveModifier = 0;
        this.goldModifier = 0;
        this.initiativeModifier = 0;
        this.claimModifier = 0;
        this.claimSet = undefined;
        this.printedValues = {
            claim: [cardData.plotStats.claim],
            income: [cardData.plotStats.income],
            initiative: [cardData.plotStats.initiative],
            reserve: [cardData.plotStats.reserve]
        };
    }

    whenRevealed(properties) {
        const condition = properties.condition || (() => true);
        let whenClause = {
            when: {
                onPlotRevealed: (event, context) => event.plot === this && condition(context)
            }
        };
        let reaction = new CardWhenRevealed(this.game, this, Object.assign(whenClause, properties));
        this.abilities.reactions.push(reaction);
    }

    getWhenRevealedAbility() {
        return this.abilities.reactions.find((ability) => ability instanceof CardWhenRevealed);
    }

    getInitiative() {
        const baseValue = this.canProvidePlotModifier['initiative']
            ? this.getPrintedInitiative()
            : 0;
        return Math.max(baseValue + this.initiativeModifier, 0);
    }

    getPrintedInitiative() {
        return this.getPrintedNumberFor(
            this.printedValues.initiative[this.printedValues.initiative.length - 1]
        );
    }

    getIncome() {
        let baseValue = this.canProvidePlotModifier['gold']
            ? this.baseIncome || this.getPrintedIncome()
            : 0;

        return baseValue + this.goldModifier;
    }

    getPrintedIncome() {
        return this.getPrintedNumberFor(
            this.printedValues.income[this.printedValues.income.length - 1]
        );
    }

    getReserve() {
        var baseValue = this.canProvidePlotModifier['reserve'] ? this.getPrintedReserve() : 0;
        return baseValue + this.reserveModifier;
    }

    getPrintedReserve() {
        return this.getPrintedNumberFor(
            this.printedValues.reserve[this.printedValues.reserve.length - 1]
        );
    }

    getPrintedClaim() {
        return this.getPrintedNumberFor(
            this.printedValues.claim[this.printedValues.claim.length - 1]
        );
    }

    getClaim() {
        let baseClaim = this.getPrintedClaim();

        if (typeof this.claimSet === 'number') {
            return this.claimSet;
        }

        return Math.max(baseClaim + this.claimModifier, 0);
    }

    flipFaceup() {
        // This probably isn't necessary now
        this.facedown = false;

        // But this is
        this.selected = false;
    }
}

export default PlotCard;
