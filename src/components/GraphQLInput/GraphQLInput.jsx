import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

import { format } from 'date-fns';

import { useGQLQueryWrapper } from '../../utils';
import HeadersAccordion from '../HeadersAccordion';

const GraphQLInput = ({
    url,
    setURL,
    headers,
    setHeaders,
    graphQLQuery,
    setGraphQLQuery,
    addToPreviousSearches,
    setResultObject,
}) => {
    const [queryRan, setQueryRan] = useState(false);

    const [runQuery, resultObject] = useGQLQueryWrapper({
        url,
        query: graphQLQuery,
    });
    useEffect(() => {
        if (queryRan) {
            setResultObject(resultObject);
        }
    }, [queryRan, resultObject, setResultObject]);

    const runQueryClicked = () => {
        setQueryRan(true);

        const currentSearchData = {
            url,
            headers,
            graphQLQuery,
            dateTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            callType: 'graphQL',
        };
        addToPreviousSearches(currentSearchData);
        runQuery();
    };

    return (
        <>
            <Stack direction='row' justifyContent='end'>
                <Button variant='contained' sx={{ display: 'block' }} onClick={() => runQueryClicked()}>
                    Run Query
                </Button>
            </Stack>
            <TextField
                sx={{ marginX: 2, width: 2 / 3 }}
                label='URL:'
                variant='standard'
                value={url}
                onChange={(event) => setURL(event.target.value)}
            />
            <Box sx={{ width: 2 / 3 }}>
                <TextField
                    sx={{ marginX: 2, marginTop: 2 }}
                    label='Query:'
                    variant='standard'
                    fullWidth
                    multiline
                    rows={6}
                    value={graphQLQuery}
                    onChange={(event) => setGraphQLQuery(event.target.value)}
                />
            </Box>

            <HeadersAccordion headers={headers} setHeaders={setHeaders} />
        </>
    );
};

export default GraphQLInput;
