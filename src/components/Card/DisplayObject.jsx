import React from 'react';
import { Box, Typography } from '@mui/material';
// import useModal from '../useModal';
import { trimAndCapitalize } from '../../utils';

const DisplayObject = ({ object }) => {
    const jsx = Object.keys(object)
        .filter((key) => !key.startsWith('_'))
        .map((key) => <DisplayValue key={key + object[key]} propertyName={key} propertyValue={object[key]} />);

    return <>{jsx}</>;
};

const DisplayValue = ({ propertyName = '', propertyValue }) => {
    // const [modalTitle, setModalTitle] = useState('');
    // const [modalData, setModalData] = useState([]);
    // const [toggleModal, jsxModal] = useModal(modalTitle, modalData);

    if (!!propertyValue && typeof propertyValue === 'object') {
        return <DisplayObject object={propertyValue} />;
    }

    const handleArrayClick = () => {
        // setModalTitle(modalName);
        // setModalData(selectedArrayData);
        // toggleModal();
    };

    if (Array.isArray(propertyValue)) {
        return (
            <>
                {/* {jsxModal()} */}
                <Box component='span' margin={1}>
                    <Typography style={{ fontWeight: 600 }}>
                        {trimAndCapitalize(propertyName)}
                        {': '}
                    </Typography>
                    <button
                        onClick={() => {
                            handleArrayClick(propertyName, propertyValue);
                        }}
                        type='button'>
                        {propertyValue.length.toString()}
                    </button>
                </Box>
            </>
        );
    }
    let propertyValueText = '';
    if (typeof propertyValue === 'string' || propertyValue instanceof String) {
        propertyValueText = trimAndCapitalize(propertyValue.toString());
    } else if (typeof propertyValue === 'number' || propertyValue instanceof Number) {
        propertyValueText = propertyValue.toString();
    } else if (Array.isArray(propertyValue)) {
        propertyValueText = propertyValue.length.toString();
    } else {
        propertyValueText = 'Cannot Process';
    }

    return (
        <Box component='span' margin={1}>
            <Typography style={{ display: 'inline', fontWeight: 600 }}>
                {trimAndCapitalize(propertyName)}
                {': '}
            </Typography>
            {propertyValueText}
        </Box>
    );
};

export { DisplayObject, DisplayValue };
