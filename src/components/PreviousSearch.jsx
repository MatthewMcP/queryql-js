import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Paper, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PreviousSearches = ({ previousSearches, clearSearches, setRestInput }) => {
    const loadSearch = (previousSearch) => {
        setRestInput(previousSearch);
    };

    const renderPreviousSearches = () =>
        // eslint-disable-next-line implicit-arrow-linebreak
        previousSearches.map((previousSearch) => (
            <Paper key={previousSearch.dateTime} elevation={3}>
                <Typography>{previousSearch.url}</Typography>
                <Typography>{previousSearch.method}</Typography>
                <Typography>{previousSearch.dateTime}</Typography>
                {previousSearch.body !== '' || previousSearch.headers !== '' ? (
                    <Typography>Contains further info</Typography>
                ) : (
                    <Typography>No further info</Typography>
                )}
                <Typography
                    onClick={() => {
                        loadSearch(previousSearch);
                    }}>
                    Load
                </Typography>
            </Paper>
        ));
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Show Previous Searches</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button variant='contained' onClick={clearSearches}>
                    Clear History
                </Button>
                <Stack direction='row' spacing={2}>
                    {renderPreviousSearches()}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default PreviousSearches;
