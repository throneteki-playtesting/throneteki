import AgendaCard from '../../agendacard.js';

class JoinForces extends AgendaCard {
    constructor(owner, cardData) {
        super(owner, cardData);

        this.registerEvents(['onDecksPrepared']);
    }

    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.reduceFirstMarshalledOrPlayedCardCostEachRound(1, (card) =>
                this.namedTrait && card.hasTrait(this.namedTrait)
            )
        });
    }

    onDecksPrepared() {
        let traitsInDeck = [];
        for (const card of this.game.allCards) {
            if (
                card.owner !== this.owner ||
                card.getPrintedFaction() === this.controller.getFaction() ||
                card.getPrintedFaction() === 'neutral' ||
                ['agenda', 'faction'].includes(card.getType())
            ) {
                continue;
            }

            let traits = card.getTraits();
            if (traitsInDeck.length === 0) {
                traitsInDeck.push(...traits);
            } else {
                traitsInDeck = traitsInDeck.filter((trait) => traits.includes(trait));
                if (traitsInDeck.length === 0) {
                    break;
                }
            }
        }

        if (traitsInDeck.length > 0) {
            this.namedTrait = traitsInDeck[0];
            this.game.addMessage(
                '{0} names {1} as their trait for {2}',
                this.controller,
                this.capitalize(this.namedTrait),
                this
            );
        } else {
            this.game.addMessage(
                "{0}'s deck does not share a common trait to name with {1}",
                this.controller,
                this
            );
        }
    }

    capitalize(string) {
        return string.replace(/\b\w/g, char => char.toUpperCase());
    }
}

JoinForces.code = '00361';

export default JoinForces;
