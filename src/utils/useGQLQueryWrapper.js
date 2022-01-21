import { useMemo } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { QueryStateEnum } from './useAxiosWrapper';

const useGQLQueryWrapper = ({ url, query }) => {
    const apolloClient = useMemo(
        () =>
            // eslint-disable-next-line implicit-arrow-linebreak
            new ApolloClient({
                uri: 'https://countries.trevorblades.com/',
            }),
        // eslint-disable-next-line comma-dangle
        [url]
    );

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

    const { error, data } = useQuery(gql(defaultQueryString || query), {
        client: apolloClient,
    });

    if (error) {
        return [{ status: QueryStateEnum.errored, data: undefined, error }];
    }

    if (data) {
        return [{ status: QueryStateEnum.resolved, data, error: null }];
    }

    return [{ status: QueryStateEnum.loading, data: undefined, error: null }];
};

export default useGQLQueryWrapper;
