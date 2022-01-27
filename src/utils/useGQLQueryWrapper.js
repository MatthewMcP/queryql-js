import { useMemo } from 'react';

import { ApolloClient, useLazyQuery, gql, InMemoryCache } from '@apollo/client';

import { QueryStateEnum } from './useAxiosWrapper';

const useGQLQueryWrapper = ({ url = '', query }) => {
    const cache = new InMemoryCache();

    const apolloClient = useMemo(
        () => {
            if (url) {
                return new ApolloClient({
                    cache,
                    uri: url,
                });
            }

            return null;
        },
        // eslint-disable-next-line comma-dangle
        [url]
    );

    //                uri:'https://countries.trevorblades.com/',
    //     const defaultQueryString = `{
    //     countries {
    //       name
    //       native
    //       capital
    //       phone
    //       emoji
    //       currency
    //       languages {
    //         code
    //         name
    //       }
    //     }
    //   }`;

    const [runQuery, { error, data }] = useLazyQuery(gql(query), {
        client: apolloClient,
    });

    if (error) {
        return [runQuery, { status: QueryStateEnum.errored, data: undefined, error }];
    }

    if (data) {
        return [runQuery, { status: QueryStateEnum.resolved, data, error: null }];
    }

    return [runQuery, { status: QueryStateEnum.loading, data: undefined, error: null }];
};

export default useGQLQueryWrapper;
