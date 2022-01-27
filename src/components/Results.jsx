import React, { useState } from 'react';
import { Box, CircularProgress, Stack, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

import { QueryStateEnum, logError } from '../utils';
import SimpleDisplay from './SimpleDisplay';
import Table from './Table';
import Card from './Card';

const Results = ({ data, status, error }) => {
    const [display, setDisplay] = useState('JSON');

    if (!data && !status && !error) {
        return <Box marginY={2} />;
    }

    if (status === QueryStateEnum.loading) {
        return (
            <Stack marginY={4} alignItems='center'>
                <CircularProgress />
            </Stack>
        );
    }

    if (status === QueryStateEnum.errored) {
        logError(error);

        return (
            <Stack marginY={3} alignItems='center'>
                <Typography> There was an error, check console for further details</Typography>
                <Typography color='red'>{error.message} </Typography>
            </Stack>
        );
    }

    return (
        <>
            <Stack marginY={4} alignItems='center'>
                <ToggleButtonGroup
                    value={display}
                    exclusive
                    onChange={(e, newDisplay) => setDisplay(newDisplay)}
                    aria-label='Display Format'>
                    <ToggleButton value='JSON' aria-label='JSON'>
                        <Typography variant='body2'>JSON</Typography>
                    </ToggleButton>
                    <ToggleButton value='TABLE' aria-label='Table'>
                        <Typography variant='body2'>Table</Typography>
                    </ToggleButton>
                    <ToggleButton value='CARD' aria-label='Card'>
                        <Typography variant='body2'>Card</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
                {display === 'JSON' && <SimpleDisplay data={data} />}
                {display === 'TABLE' && <Table data={[data.data] || [data]} />}
                {display === 'CARD' && <Card data={[data.data] || [data]} />}
            </Stack>
        </>
    );
};

export default Results;
