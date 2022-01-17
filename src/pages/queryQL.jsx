import React, { useMemo, useState } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { ToastContainer } from 'react-toastify';
import { logError, useQueryString } from '../utils';
import Card from '../components/Card';
import Table from '../components/Table';
import 'react-toastify/dist/ReactToastify.css';

// const TinyUrl = require('tinyurl');

const QueryQL = () => {
    console.log('QueryQL: ');
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

    // TODO: Remove the default closer to 'release'
    // const { queryValue, onSetQueryValue } = useQueryString('query', defaultQueryString);
    const [queryText, setQueryText] = useState(defaultQueryString);
    const debounceTime = 1000;
    const [debouncedQueryText] = useDebounce(queryText, debounceTime);
    const handleQueryChange = (e) => {
        const target = e.target;
        setQueryText(target.value);
    };
    // useEffect(() => {
    //     onSetQueryValue(debouncedQueryText);
    // }, [debouncedQueryText]);

    // TODO: Remove the default closer to 'release'
    // const { value: uriValue, onSetValue: onSetURIValue } = useQueryString('uri', 'https://countries.trevorblades.com/');
    const [uri, setURIText] = useState('https://countries.trevorblades.com/');
    const [debouncedURIText] = useDebounce(uri, debounceTime);
    const handleURIChange = (e) => {
        const target = e.target;
        setURIText(target.value);
    };
    const apolloClient = useMemo(() => {
        // onSetURIValue(debouncedURIText);
        return new ApolloClient({
            uri: debouncedURIText,
        });
    }, [debouncedURIText]);

    const [queryResultData, setQueryResultData] = useState([]);
    const { error: gqlError, loading } = useQuery(gql(debouncedQueryText), {
        client: apolloClient,
        skip: !debouncedQueryText,
        onCompleted: (data) => {
            if (data && data[Object.keys(data)[0]]) {
                setQueryResultData(data[Object.keys(data)[0]]);
            }
        },
        onError: (error) => {
            logError(error);
            setQueryResultData([]);
        },
    });

    const handleTinyURLButtonClick = () => {
        // TinyUrl.shorten(window.location.href, (shortenedUrl, error) => {
        //     if (error) {
        //         logError(error);
        //     }
        //     navigator.clipboard.writeText(shortenedUrl);
        //     toast(`${shortenedUrl} Copied to clipboard`);
        // });
    };

    const { value: showQuerySectionValue, onSetValue: onShowQuerySectionValue } = useQueryString('showQuery', 'true');
    const handleQuerySectionButtonClick = () => {
        if (showQuerySectionValue === 'true') {
            onShowQuerySectionValue('false');
        } else {
            onShowQuerySectionValue('true');
        }
    };
    const showQuerySection = useMemo(() => {
        return showQuerySectionValue === 'true';
    }, [showQuerySectionValue]);

    const { value: displayTypeValue, onSetValue: onDisplayTypeValue } = useQueryString('displayType', 'table');
    const showTableDisplay = useMemo(() => {
        return displayTypeValue === 'table';
    }, [displayTypeValue]);

    const handleDisplayTypeChange = () => {
        if (displayTypeValue === 'table') {
            onDisplayTypeValue('card');
        } else {
            onDisplayTypeValue('table');
        }
    };

    return (
        <div className='container mx-auto px-6 text-white'>
            <ToastContainer autoClose={3000} pauseOnHover />
            <h1 className='flex justify-center mb-8'>queryQL</h1>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2'
                onClick={handleTinyURLButtonClick}
                type='button'>
                Create tinyURL and copy to clipboard
            </button>
            <div className='border-solid border-4 border-gray-600 p-1'>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2'
                    onClick={handleQuerySectionButtonClick}
                    type='button'>
                    {showQuerySection ? 'Hide ' : 'Show '}
                    Query Section
                </button>
                {showQuerySection && (
                    <div className='grid grid-cols-2 gap-2 py-2'>
                        <label className='col-span-1' htmlFor='uri'>
                            URI:
                            <input
                                type='text'
                                className='w-full box-border border-4 border-gray-400 bg-gray-200 text-black'
                                id='uri'
                                name='name'
                                onChange={handleURIChange}
                                value={uri}
                            />
                        </label>
                        <div className='col-span-1 flex flex-col'>
                            <label htmlFor='queryText'>
                                Query:
                                <textarea
                                    className='box-border h-64 w-full p-2 border-4 border-gray-400 bg-gray-200 text-black'
                                    id='queryText'
                                    onChange={handleQueryChange}
                                    rows={6}
                                    value={queryText}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <div className='border-solid border-4 border-gray-600 p-1'>
                {loading && <p className='container mx-auto px-6'>Data Is loading</p>}
                {gqlError && <p className='container mx-auto px-6'>{gqlError.message}</p>}
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2'
                    onClick={handleDisplayTypeChange}
                    type='button'>
                    {showTableDisplay ? 'Show Card Display ' : 'Show Table Display'}
                </button>
                {showTableDisplay ? <Table data={queryResultData} /> : <Card data={queryResultData} />}
            </div>
        </div>
    );
};
export default QueryQL;
