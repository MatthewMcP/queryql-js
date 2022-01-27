import useAxios from 'axios-hooks';

const QueryStateEnum = Object.freeze({ errored: 0, loading: 1, resolved: 2 });

const useAxiosWrapper = (configObject, options = null) => {
    const [{ data, loading, error }, refetch] = useAxios(configObject, options);

    if (error) {
        return [{ status: QueryStateEnum.errored, data: undefined, error }, refetch];
    }

    if (loading) {
        return [{ status: QueryStateEnum.loading, data: undefined, error: null }, refetch];
    }

    return [{ status: QueryStateEnum.resolved, data, error: null }, refetch];
};

export { useAxiosWrapper, QueryStateEnum };
