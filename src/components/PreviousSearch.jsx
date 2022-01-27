/* eslint-disable no-extra-parens */
import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PreviousSearches = ({ previousSearches, clearSearches, loadPreviousSearch, removeSearch }) => {
    const renderPreviousSearches = () =>
        // eslint-disable-next-line implicit-arrow-linebreak
        previousSearches.map((previousSearch, i) => (
            <Box key={previousSearch.dateTime}>
                <Paper elevation={3} sx={{ margin: 1, padding: 1, width: 200, height: 275 }}>
                    <Typography>{previousSearch.callType}</Typography>
                    <Tooltip title={previousSearch.url}>
                        <Typography noWrap={true}>{previousSearch.url}</Typography>
                    </Tooltip>
                    {previousSearch.callType === 'REST' ? (
                        <Typography>{previousSearch.method}</Typography>
                    ) : (
                        <Tooltip title={previousSearch.graphQLQuery}>
                            <Typography noWrap={true}>{previousSearch.graphQLQuery}</Typography>
                        </Tooltip>
                    )}
                    {previousSearch.data !== '' || previousSearch.method !== 'GET' ? (
                        <Tooltip title={previousSearch.data}>
                            <Typography noWrap={true}>Body</Typography>
                        </Tooltip>
                    ) : (
                        <Typography>No Body included</Typography>
                    )}

                    {previousSearch.headers.length !== 0 ? (
                        <Tooltip title={previousSearch.headers}>
                            <Typography noWrap={true}>Headers</Typography>
                        </Tooltip>
                    ) : (
                        <Typography>No additional Headers</Typography>
                    )}

                    <Typography>{previousSearch.dateTime}</Typography>

                    <Box>
                        <Button
                            sx={{ display: 'inline' }}
                            variant='text'
                            onClick={() => loadPreviousSearch(previousSearch)}>
                            Load
                        </Button>
                        <Button sx={{ display: 'inline' }} variant='text' onClick={() => removeSearch(i)}>
                            Remove
                        </Button>
                    </Box>
                </Paper>
            </Box>
        ));

    return (
        <Accordion elevation={3}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Show Previous Searches</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button sx={{ marginBottom: 2 }} variant='contained' onClick={clearSearches}>
                    Clear History
                </Button>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Stack direction='row' spacing={2} overflow={'auto'}>
                        {previousSearches.length !== 0 ? (
                            renderPreviousSearches()
                        ) : (
                            <Typography>No Previous Searches</Typography>
                        )}
                    </Stack>
                </Paper>
            </AccordionDetails>
        </Accordion>
    );
};

export default PreviousSearches;
