import { logWarning } from './logger';

const trimAndCapitalize = (unformattedString) => {
    if (!unformattedString) {
        logWarning('Empty string passed to trimAndCapitalize');
        return '';
    }
    if (typeof unformattedString === 'string' || unformattedString instanceof String) {
        logWarning('unformattedString is not a string!');
        return '';
    }

    return unformattedString;
    // const trimmedString = unformattedString.trim();

    // return trimmedString.trim().charAt(0).toUpperCase() + trimmedString.slice(1);
};

export default trimAndCapitalize;
