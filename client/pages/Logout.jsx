import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useLogoutAccountMutation } from '../redux/middleware/api';
import { startConnecting } from '../redux/reducers/lobby';
import { accountLoggedOut } from '../redux/reducers/auth';
import { navigate } from '../redux/reducers/navigation';
import LoadingSpinner from '../Components/Site/LoadingSpinner';
import { toast } from 'react-toastify';
import Page from './Page';

const Logout = () => {
    const [logout, { isLoading }] = useLogoutAccountMutation();
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const dispatch = useDispatch();

    useEffect(() => {
        async function doLogout() {
            try {
                await logout(refreshToken.id).unwrap();
            } catch (err) {
                toast.error(
                    err.message || 'An error occurred logging you out. Please try again later.'
                );

                return;
            }

            dispatch(accountLoggedOut());

            dispatch(startConnecting());

            toast.success('You were successfully logged out.');
            dispatch(navigate('/'));
        }

        if (!refreshToken) {
            return;
        }

        doLogout();
    }, [dispatch, logout, refreshToken]);

    return (
        <Page className='h-full'>
            {isLoading && <LoadingSpinner label='Logging you out of your account...' />}
        </Page>
    );
};

export default Logout;
