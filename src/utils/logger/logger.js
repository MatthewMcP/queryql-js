const log = (logMessage) => {
    console.error(`Log: ${logMessage}`);
};

const logError = (error) => {
    console.error('Logging error');
    console.error(error);
};

const logWarning = (warning) => {
    console.warn(`Warning: ${warning}`);
};

export { log, logError, logWarning };
