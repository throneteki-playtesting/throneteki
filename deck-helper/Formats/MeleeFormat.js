const MeleeFormat = {
    name: 'melee',
    requiredDraw: 60,
    requiredPlots: 7,
    maxDoubledPlots: 1,
    cannotInclude: (card) => ['VDS','ToJ'].includes(card.packCode),
    rules: [
        {
            message: 'You cannot include Draft cards in a normal deck',
            condition: (deck) => {
                return deck.getUniqueCards().every((card) => !['VDS','ToJ'].includes(card.packCode));
            }
        }
    ]
};

export default MeleeFormat;
