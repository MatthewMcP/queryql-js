import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MattHeader from './components/MattHeader';
import GraphQLInput from './components/GraphQLInput';
import RestInput from './components/RestInput';
import PreviousSearch from './components/PreviousSearch';
import Home from './pages/home';

const App = () => {
    const theme = createTheme();

    const [url, setURL] = useState('');
    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState('');
    const [headers, setHeaders] = useState([]);
    const [graphQLQuery, setGraphQLQuery] = useState([]);

    const setRestInput = (config) => {
        setURL(config.url);
        setMethod(config.method);
        setBody(config.data);
        setHeaders(config.headers);
    };

    const [previousSearches, setPreviousSearches] = useState([]);
    useEffect(() => {
        const previousSearchDataRaw = localStorage.getItem('PreviousSearchData');

        if (previousSearchDataRaw) {
            setPreviousSearches(JSON.parse(previousSearchDataRaw));
        }
    }, []);

    const addToPreviousSearches = (newSearchInfo) => {
        setPreviousSearches((oldSearches) => {
            const arrayLength = oldSearches.unshift(newSearchInfo);
            const maxPreviousSearches = 9;
            if (arrayLength === maxPreviousSearches) {
                oldSearches.pop();
            }
            localStorage.setItem('PreviousSearchData', JSON.stringify(oldSearches));
            return oldSearches;
        });
    };

    const clearSearches = () => {
        localStorage.removeItem('PreviousSearchData');
        setPreviousSearches([]);
    };
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <MattHeader />
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography component='h1' variant='h5'>
                            Sign up
                        </Typography>
                        <GraphQLInput
                            url={url}
                            setURL={setURL}
                            graphQLQuery={graphQLQuery}
                            setGraphQLQuery={setGraphQLQuery}
                            headers={headers}
                            setHeaders={setHeaders}
                            addToPreviousSearches={addToPreviousSearches}
                        />
                        <RestInput
                            url={url}
                            setURL={setURL}
                            method={method}
                            setMethod={setMethod}
                            body={body}
                            setBody={setBody}
                            headers={headers}
                            setHeaders={setHeaders}
                            addToPreviousSearches={addToPreviousSearches}
                        />
                    </Box>
                    <Home />
                    <PreviousSearch
                        setRestInput={setRestInput}
                        previousSearches={previousSearches}
                        clearSearches={clearSearches}
                    />
                </Container>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default App;
