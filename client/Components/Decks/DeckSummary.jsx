import React, { useMemo } from 'react';
import { useGetCardsQuery } from '../../redux/middleware/api';
import { sortBy } from 'underscore';
import CardHoverable from '../Images/CardHoverable';
import classNames from 'classnames';
import ThronesIcon from '../GameBoard/ThronesIcon';

const DeckSummary = ({ className, deck }) => {
    const { data: cardsResponse } = useGetCardsQuery({});

    const cardsByCode = useMemo(() => {
        return cardsResponse;
    }, [cardsResponse]);

    const groupedCards = {
        agenda: [],
        plot: [],
        character: [],
        attachment: [],
        location: [],
        event: []
    };

    const deckCards = deck.deckCards
        .filter((dc) => dc.type !== 'Banner')
        .map((dc) => ({ card: cardsByCode[dc.card.code], count: dc.count }));

    for (const deckCard of deckCards) {
        const type = deckCard.card.type;
        if (groupedCards[type]) {
            groupedCards[type].push(deckCard);
        }
    }

    const containers = Object.entries(groupedCards).map(([type, cards]) => {
        const header = (
            <div>
                <div key={type} className='m-1'>
                    <ThronesIcon icon={type} className='me-1' />
                    <strong>
                        {type[0].toUpperCase() + type.slice(1)} (
                        {cards.reduce((acc, card) => acc + card.count, 0)})
                    </strong>
                </div>
            </div>
        );

        const sortedCards = sortBy(cards, (card) => card.card.name).map((card, index) => (
            <CardHoverable key={index} code={card.card.code} type={card.card.type}>
                <div className='flex flex-row gap-1'>
                    {`${card.count}x`}
                    <ThronesIcon icon={type} color={card.card.faction} />
                    <span>{card.card.label}</span>
                </div>
            </CardHoverable>
        ));

        return (
            <div key={type} className='break-inside-avoid pt-1'>
                {header}
                <div className='flex flex-col items-start'>{sortedCards}</div>
            </div>
        );
    });

    const containerClass = classNames(
        className,
        'columns-2 md:columns-3 xl:columns-2 2xl:columns-3 gap-2'
    );
    return <div className={containerClass}>{containers}</div>;
};

export default DeckSummary;
