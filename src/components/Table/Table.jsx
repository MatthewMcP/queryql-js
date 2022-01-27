import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';

// import useModal from '../useModal';
import { trimAndCapitalize } from '../../utils';

const TableDisplay = ({ data }) => {
    let jsxTableHeader = [];
    if (data && data[0]) {
        jsxTableHeader = Object.keys(data[0])
            .filter((key) => !key.startsWith('_'))
            .map((key) => (
                <TableCell key={key + data[key]} style={{ fontWeight: 600 }}>
                    {trimAndCapitalize(key)}
                </TableCell>
            ));
    }

    // const [modalTitle, setModalTitle] = useState('');
    // const [modalData, setModalData] = useState([]);
    // const [toggleModal, jsxModal] = useModal(modalTitle, modalData);

    // const handleArrayClick = () => {
    //     // setModalTitle(modalName);
    //     // setModalData(selectedArrayData);
    //     // toggleModal();
    // };

    return (
        <Box sx={{ marginY: 4 }}>
            <TableContainer>
                {/* {jsxModal()} */}
                {data ? (
                    <>
                        <Table border='1'>
                            <TableHead>
                                <TableRow>{jsxTableHeader}</TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((singleData, index) => {
                                    const jsxTableCells = Object.keys(singleData)
                                        .filter((key) => !key.startsWith('_'))
                                        .map((key) => {
                                            if (Array.isArray(singleData[key])) {
                                                return (
                                                    <TableCell
                                                        // eslint-disable-next-line react/no-array-index-key
                                                        key={index + key}>
                                                        {/* <button
                                                        onClick={() => {
                                                            handleArrayClick(key, singleData[key]);
                                                        }}
                                                        type='button'>
                                                        {trimAndCapitalize(singleData[key].length.toString())}
                                                    </button> */}
                                                    </TableCell>
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
                                                <TableCell
                                                    // eslint-disable-next-line react/no-array-index-key
                                                    key={index + key}>
                                                    {cellText}
                                                    {/* {trimAndCapitalize(cellText)} */}
                                                </TableCell>
                                            );
                                        });
                                    // eslint-disable-next-line react/no-array-index-key
                                    return <tr key={index}>{jsxTableCells}</tr>;
                                })}
                            </TableBody>
                        </Table>
                    </>
                ) : (
                    <span>Nodata present</span>
                )}
            </TableContainer>
        </Box>
    );
};
export default TableDisplay;
