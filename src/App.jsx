import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, Switch, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import GraphQLInput from './components/GraphQLInput';
import MattHeader from './components/MattHeader';
import PreviousSearch from './components/PreviousSearch';
import RestInput from './components/RestInput';

const App = () => {
    const theme = createTheme();

    const [showGQL, setShowGQL] = useState(false);
    // const [url, setURL] = useState('https://countries.trevorblades.com/');            https://reqres.in/api/users/1?delay=2
    const [url, setURL] = useState('https://reqres.in/api/users/1?delay=2');

    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState('');
    const [headers, setHeaders] = useState([]);

    const defaultQueryString = `{
        countries {
          name
          native
          capital
          phone
          emoji
          currency
          languages {
            code
            name
          }
        }
      }`;
    const [graphQLQuery, setGraphQLQuery] = useState(defaultQueryString);

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
    const removeSearch = (i) => {
        setPreviousSearches((oldSearches) => {
            oldSearches.splice(i, 1);
            localStorage.setItem('PreviousSearchData', JSON.stringify(oldSearches));
            return oldSearches;
        });
    };
    const clearSearches = () => {
        localStorage.removeItem('PreviousSearchData');
        setPreviousSearches([]);
    };
    const loadPreviousSearch = (config) => {
        if (config.callType === 'REST') {
            setShowGQL(false);
            setGraphQLQuery('');
            setMethod(config.method);
            setBody(config.data);
        } else {
            setShowGQL(true);
            setGraphQLQuery(config.graphQLQuery);
            setMethod('');
            setBody('');
        }
        setURL(config.url);
        setHeaders(config.headers);
    };

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <MattHeader />
                <Container component='main'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography component='h1' variant='h5'>
                            QueryQL
                        </Typography>
                        <Typography variant='body1'>
                            Enter either a rest or a graphQL query below to poll any API.
                        </Typography>

                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant='body2' sx={{ display: 'inline' }}>
                                REST
                            </Typography>
                            <Switch
                                checked={showGQL}
                                onChange={() => {
                                    setShowGQL((prev) => !prev);
                                }}
                            />
                            <Typography variant='body2' sx={{ display: 'inline' }}>
                                Graph QL
                            </Typography>
                        </Box>

                        <Box sx={{ marginTop: 4, width: 2 / 3 }}>
                            {showGQL ? (
                                <GraphQLInput
                                    url={url}
                                    setURL={setURL}
                                    graphQLQuery={graphQLQuery}
                                    setGraphQLQuery={setGraphQLQuery}
                                    headers={headers}
                                    setHeaders={setHeaders}
                                    addToPreviousSearches={addToPreviousSearches}
                                />
                            ) : (
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
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 4 }}>
                        <PreviousSearch
                            loadPreviousSearch={loadPreviousSearch}
                            previousSearches={previousSearches}
                            clearSearches={clearSearches}
                            removeSearch={removeSearch}
                        />
                    </Box>
                </Container>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default App;
