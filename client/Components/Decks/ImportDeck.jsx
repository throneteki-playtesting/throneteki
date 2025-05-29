import React, { useState } from 'react';

import { Button, Link, Textarea } from '@heroui/react';
import Panel from '../Site/Panel';
import {
    useAddDeckMutation,
    useGetCardsQuery,
    useGetFactionsQuery,
    useGetPacksQuery
} from '../../redux/middleware/api';
import AlertPanel from '../Site/AlertPanel';
import { processThronesDbDeckText } from './DeckHelper';
import LoadingSpinner from '../Site/LoadingSpinner';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { navigate } from '../../redux/reducers/navigation';
import Page from '../../pages/Page';

const ImportDeck = () => {
    const [deckText, setDeckText] = useState('');

    const {
        data: factions,
        isLoading: isFactionsLoading,
        isError: isFactionsError
    } = useGetFactionsQuery({});
    const { data: cards, isLoading: isCardsLoading, isError: isCardsError } = useGetCardsQuery({});
    const { data: packs, isLoading: isPacksLoading, isError: isPacksError } = useGetPacksQuery({});
    const [addDeck, { isLoading: isAddLoading }] = useAddDeckMutation();
    const dispatch = useDispatch();

    const processDeck = async () => {
        try {
            const deck = processThronesDbDeckText(factions, packs, cards, deckText);

            if (!deck) {
                toast.error(
                    'There was an error processing your deck. Please ensure you have pasted a ThronesDb deck plain text export'
                );

                return;
            }

            await addDeck(deck).unwrap();
            toast.success('Deck added successfully.');

            dispatch(navigate('/decks'));
        } catch (err) {
            toast.error(err.message || 'An error occured adding the deck. Please try again later');
        }
    };

    return (
        <Page>
            {(isFactionsError || isCardsError || isPacksError) && (
                <AlertPanel variant='danger'>
                    An error occured loading the card data. Please try again later
                </AlertPanel>
            )}
            <Panel title={'Import Deck'}>
                {isFactionsLoading || isCardsLoading || isPacksLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <div className='mb-3'>
                            <label>
                                Export your deck as plain text from{' '}
                                <Link href='https://thronesdb.com' target='_blank' rel='noreferrer'>
                                    ThronesDB
                                </Link>{' '}
                                and paste it into this box
                            </label>
                            <Textarea minRows={20} value={deckText} onValueChange={setDeckText} />
                        </div>

                        <Button
                            type='submit'
                            color='primary'
                            isDisabled={!deckText || isAddLoading}
                            onPress={processDeck}
                        >
                            Submit
                        </Button>
                    </div>
                )}
            </Panel>
        </Page>
    );
};

export default ImportDeck;
