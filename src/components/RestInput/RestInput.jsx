import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { format } from 'date-fns';

import SimpleDisplay from '../SimpleDisplay';
import { useAxiosWrapper } from '../../utils';

const RestInput = ({ url, setURL, method, setMethod, body, setBody, headers, setHeaders, addToPreviousSearches }) => {
    const httpMethods = [{ value: 'GET' }, { value: 'POST' }, { value: 'PUT' }, { value: 'DELETE' }];

    const showBodyInput = useMemo(() => ['POST', 'PUT', 'DELETE'].includes(method), [method]);
    useEffect(() => {
        if (!showBodyInput) {
            setBody('');
        }
    }, [setBody, showBodyInput]);

    const [keyInput, setKeyInput] = useState('');
    const [keyInputErrored, setKeyInputErrored] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [valueInputErrored, setValueInputErrored] = useState(false);

    const addToHeaders = () => {
        if (keyInput === '') {
            setKeyInputErrored(true);
        } else {
            setKeyInputErrored(false);
        }

        if (valueInput === '') {
            setValueInputErrored(true);
        } else {
            setValueInputErrored(false);
        }
        if (keyInput && valueInput) {
            setHeaders((oldArray) => [...oldArray, { key: keyInput, value: valueInput }]);
            setKeyInput('');
            setValueInput('');
        }
    };

    const removeFromHeaders = (i) => {
        setHeaders((oldArray) => {
            oldArray.splice(i, 1);
            return [...oldArray];
        });
    };

    const [resultObject, refetch] = useAxiosWrapper(
        {
            url,
            method,
            headers,
            data: body,
        },
        // eslint-disable-next-line comma-dangle
        { manual: true }
    );

    const runQueryClicked = () => {
        const currentSearchData = {
            url,
            method,
            headers,
            data: body,
            dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        };
        addToPreviousSearches(currentSearchData);
        refetch();
    };

    return (
        <>
            <Box>
                <Button variant='contained' onClick={() => runQueryClicked()}>
                    Run Query
                </Button>
                <TextField
                    select
                    value={method}
                    onChange={(event) => setMethod(event.target.value)}
                    SelectProps={{ native: true }}
                    variant='standard'>
                    {httpMethods.map((httpMethod) => (
                        <option key={httpMethod.value} value={httpMethod.value}>
                            {httpMethod.label || httpMethod.value}
                        </option>
                    ))}
                </TextField>
                <TextField
                    label='URL:'
                    variant='standard'
                    value={url}
                    onChange={(event) => setURL(event.target.value)}
                />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Headers</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography>KEY</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>VALUE</Typography>
                                </Grid>
                                {headers.map((header, i) => (
                                    <Fragment key={header.key}>
                                        <Grid item xs={5}>
                                            <Typography variant='standard'>{header.key}</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant='standard'>{header.value}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <RemoveCircleIcon onClick={() => removeFromHeaders(i)} />
                                        </Grid>
                                    </Fragment>
                                ))}
                                <Grid item xs={5}>
                                    <TextField
                                        variant='standard'
                                        value={keyInput}
                                        onChange={(event) => setKeyInput(event.target.value)}
                                        error={keyInputErrored}
                                        helperText={keyInputErrored ? 'Must have value.' : ''}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        variant='standard'
                                        value={valueInput}
                                        onChange={(event) => setValueInput(event.target.value)}
                                        error={valueInputErrored}
                                        helperText={valueInputErrored ? 'Must have value.' : ''}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <AddCircleIcon onClick={addToHeaders} />
                                </Grid>
                            </Grid>
                        </>
                    </AccordionDetails>
                </Accordion>
                {showBodyInput && (
                    <>
                        <TextField
                            label='Body:'
                            variant='standard'
                            multiline
                            rows={4}
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                        />
                    </>
                )}
            </Box>
            <SimpleDisplay {...resultObject} />
        </>
    );
};

export default RestInput;
