/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

import { format } from 'date-fns';

import { useAxiosWrapper } from '../../utils';
import HeadersAccordion from '../HeadersAccordion';
import Results from '../Results';

const RestInput = ({
    url,
    setURL,
    method,
    setMethod,
    body,
    setBody,
    headers,
    setHeaders,
    addToPreviousSearches,
    setQueryResult,
}) => {
    const httpMethods = [{ value: 'GET' }, { value: 'POST' }, { value: 'PUT' }, { value: 'DELETE' }];
    const showBodyInput = useMemo(() => ['POST', 'PUT', 'DELETE'].includes(method), [method]);
    useEffect(() => {
        if (!showBodyInput) {
            setBody('');
        }
    }, [setBody, showBodyInput]);

    const [queryRan, setQueryRan] = useState(false);
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
        setQueryRan(true);
        const currentSearchData = {
            url,
            method,
            headers,
            data: body,
            dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            callType: 'REST',
        };
        addToPreviousSearches(currentSearchData);
        refetch();
    };

    return (
        <>
            <Stack direction='row' justifyContent='end'>
                <Button variant='contained' sx={{ display: 'block' }} onClick={() => runQueryClicked()}>
                    Run Query
                </Button>
            </Stack>

            <Box>
                <TextField
                    sx={{ marginX: 2 }}
                    select
                    value={method}
                    label='Method'
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
                    sx={{ width: 1 / 2 }}
                    label='URL:'
                    variant='standard'
                    value={url}
                    onChange={(event) => setURL(event.target.value)}
                />

                {showBodyInput && (
                    <Box sx={{ width: 2 / 3 }}>
                        <TextField
                            sx={{ marginX: 2, marginTop: 2 }}
                            label='Body:'
                            variant='standard'
                            fullWidth
                            multiline
                            rows={6}
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                        />
                    </Box>
                )}

                <HeadersAccordion headers={headers} setHeaders={setHeaders} />
            </Box>
            {queryRan && <Results {...resultObject} />}
        </>
    );
};

export default RestInput;
