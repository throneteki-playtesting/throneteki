const TowerOfJoyFormat = {
    name: 'tower of joy',
    requiredDraw: 40,
    requiredPlots: 7,
    maxDoubledPlots: 1,
    cannotInclude: (card) => card.packCode !== 'ToJ',
    rules: [
        {
            message: 'You cannot include non-ToJ cards in a ToJ draft deck',
            condition: (deck) => {
                return deck.getUniqueCards().every((card) => card.packCode === 'ToJ');
            }
        }
    ]
};

export default TowerOfJoyFormat;
