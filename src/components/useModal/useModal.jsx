import React, { useState } from 'react';
// import { Card } from '../index';
import { trimAndCapitalize } from '../../utils';

const useModal = (title, data) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleModal = () => {
        setShow(!show);
    };

    const jsxModal = () => (
        <>
            {show && (
                <div className='modal modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center'>
                    <div className='modal-overlay absolute w-full h-full bg-gray-900 opacity-75' />
                    <div className='modal-container bg-gray-600 w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto'>
                        <div className='modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50'>
                            <svg
                                onClick={handleClose}
                                className='fill-current text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'>
                                <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z' />
                            </svg>
                        </div>
                        <div className='modal-content py-4 text-left px-6 max-h-screen-9/10'>
                            <h1 className='text-xl'>{trimAndCapitalize(title)}</h1>
                            {/* <Card data={data} /> */}
                            <div className='flex justify-end pt-2'>
                                <button
                                    className='modal-close bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2'
                                    onClick={handleClose}
                                    type='button'>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    return [toggleModal, jsxModal];
};

export default useModal;
