// https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import qs from 'query-string';
import { Base64 } from 'js-base64';
import pako from 'pako';

const setQueryStringWithoutPageReload = (queryStringValue) => {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryStringValue}`;
    window.history.pushState({ path: newurl }, '', newurl);
};

const getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    if (values[key]) {
        const stringValue = values[key];
        console.log('stringValue: ', stringValue);
        const unencodedValue = Base64.decode(stringValue);
        console.log('unencodedValue: ', unencodedValue);
        try {
            const decompressedVal = pako.inflate(unencodedValue, { to: 'string' });
            console.log('decompressedVal: ', decompressedVal);
            return decompressedVal;
        } catch (err) {
            console.log('err: ', err);
            console.log(err);
        }
        const decompressedVal = pako.inflate(unencodedValue, { to: 'string' });
        console.log('decompressedVal: ', decompressedVal);
        return decompressedVal;
    }
    return '';
};

const setQueryStringValue = (key, value, queryString = window.location.search) => {
    const qsValues = qs.parse(queryString);
    const compressedValue = pako.deflate(value, { to: 'string' });
    const encodedAndCompressedValue = Base64.encode(compressedValue);

    const newQsValue = qs.stringify({
        ...qsValues,
        [key]: encodedAndCompressedValue,
    });
    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export { getQueryStringValue, setQueryStringValue };
