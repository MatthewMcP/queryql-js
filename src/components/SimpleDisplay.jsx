import React from 'react';
import { CircularProgress } from '@mui/material';

import { QueryStateEnum, logError } from '../utils';

const SimpleDisplay = ({ data, status, error }) => {
    if (status === QueryStateEnum.loading) {
        return <CircularProgress />;
    }

    if (status === QueryStateEnum.errored) {
        logError(error);
        return <div>There was an error</div>;
    }
    return (
        <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
};

export default SimpleDisplay;
