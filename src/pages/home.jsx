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
           TODO: Integrate graphQL
           TODO: show query type on previous
            TODO: ESLINT IGNORE comments
           TODO: Warning about headers not saved
           TODO: Styling
           TODO: Run Query Button + auto run toggle */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Home;
