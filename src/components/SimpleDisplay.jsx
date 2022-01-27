import React from 'react';

const SimpleDisplay = ({ data }) => (
    <>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
);

export default SimpleDisplay;
