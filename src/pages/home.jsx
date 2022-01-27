import React from 'react';
import { CircularProgress } from '@mui/material';

import { useAxiosWrapper, QueryStateEnum, logError } from '../utils';

const Home = () => {
    const { data, status, error } = useAxiosWrapper({ url: 'https://reqres.in/api/users?delay=1' });
    if (status === QueryStateEnum.loading) {
        return <CircularProgress />;
    }

    if (status === QueryStateEnum.errored) {
        logError(error);
        return <div>There was an error</div>;
    }
    return (
        <div>
            Home
            {/*
            https://reqres.in/api/users/1?delay=2
            TODO Test with more REST API
            TODO: Handle graphQL running on change and causing error
            TODO: Handle previous searches not re-rendering
            TODO: Handle error + loading display
           TODO: Handling data.data or data.countries
           TODO: Add Modals
            TODO: ESLINT IGNORE comments
           TODO: Warning about headers not saved
            TODO: query string but only on initial
           TODO: Run Query Button + auto run toggle */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Home;
