class PowerAsGoldSource {
    constructor(card, allowSpendingFunc = () => true) {
        this.card = card;
        this.allowSpendingFunc = allowSpendingFunc;
        this.goldMultiplier = 2;
    }

    get gold() {
        return this.card.power * this.goldMultiplier;
    }

    get name() {
        return `${this.card.name}'s power`;
    }

    allowSpendingFor(spendParams) {
        return this.allowSpendingFunc(spendParams);
    }

    modifyGold(amount) {
        let powerAmount = Math.ceil(amount / this.goldMultiplier);
        this.card.modifyPower(powerAmount);
    }
}

export default PowerAsGoldSource;
