import React from 'react';
import { DisplayObject } from './DisplayObject';

const CardDisplay = ({ data }) => (
    <div className='container mx-auto'>
        {data ? (
            <>
                {data.map((singleData, index) => (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className='container mx-auto text-white border-2 border-white m-2 rounded flex flex-wrap'>
                        <DisplayObject object={singleData} />
                    </div>
                ))}
            </>
        ) : (
            <span>Nodata present</span>
        )}
    </div>
);
export default CardDisplay;
