import React, { useState } from 'react';
import useModal from '../useModal';
import { trimAndCapitalize } from '../../utils';

const TableDisplay = ({ data }) => {
    let jsxTableHeader = [];
    if (data && data[0]) {
        jsxTableHeader = Object.keys(data[0])
            .filter((key) => !key.startsWith('_'))
            .map((key) => (
                <th key={key + data[key]} className='box-border border-2 px-2 break-all'>
                    {trimAndCapitalize(key)}
                </th>
            ));
    }

    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);
    const [toggleModal, jsxModal] = useModal(modalTitle, modalData);

    const handleArrayClick = (modalName, selectedArrayData) => {
        setModalTitle(modalName);
        setModalData(selectedArrayData);
        toggleModal();
    };

    return (
        <div>
            {jsxModal()}
            {data ? (
                <>
                    <table className='table-fixed overflow-x-auto'>
                        <thead>
                            <tr>{jsxTableHeader}</tr>
                        </thead>
                        <tbody className='text-center'>
                            {data.map((singleData, index) => {
                                const jsxTableCells = Object.keys(singleData)
                                    .filter((key) => !key.startsWith('_'))
                                    .map((key) => {
                                        if (Array.isArray(singleData[key])) {
                                            return (
                                                <td
                                                    // eslint-disable-next-line react/no-array-index-key
                                                    key={index + key}
                                                    className='box-border border-2 sm:px-2 break-all'>
                                                    <button
                                                        onClick={() => {
                                                            handleArrayClick(key, singleData[key]);
                                                        }}
                                                        type='button'
                                                        className='no-underline hover:underline text-blue-500 text-lg'>
                                                        {trimAndCapitalize(singleData[key].length.toString())}
                                                    </button>
                                                </td>
                                            );
                                        }
                                        let cellText = singleData[key];
                                        if (!cellText) {
                                            cellText = 'No Data';
                                        }
                                        if (cellText.constructor === Object) {
                                            cellText = 'Object Data';
                                        }
                                        return (
                                            <td
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={index + key}
                                                className='box-border border-2 sm:px-2 break-all'>
                                                {trimAndCapitalize(cellText)}
                                            </td>
                                        );
                                    });
                                // eslint-disable-next-line react/no-array-index-key
                                return <tr key={index}>{jsxTableCells}</tr>;
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <span>Nodata present</span>
            )}
        </div>
    );
};
export default TableDisplay;
