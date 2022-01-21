import React from 'react';
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

    if (!!propertyValue && propertyValue.constructor === Object) {
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
                <span className='w-auto m-2'>
                    {trimAndCapitalize(propertyName)}
                    {': '}
                    <button
                        onClick={() => {
                            handleArrayClick(propertyName, propertyValue);
                        }}
                        type='button'
                        className='no-underline hover:underline text-blue-500 text-lg'>
                        {propertyValue.length.toString()}
                    </button>
                </span>
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
        <span className='w-auto m-2'>
            {trimAndCapitalize(propertyName)}
            {': '}
            {propertyValueText}
        </span>
    );
};

export { DisplayObject, DisplayValue };
