import React from 'react';
import { Box, Card, CardContent, Stack } from '@mui/material';

import { DisplayObject } from './DisplayObject';

const CardDisplay = ({ data }) => (
    <Stack marginY={4} alignItems='center'>
        {data ? (
            <>
                {data.map((singleData, index) => (
                    <Card
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    p: 1,
                                    m: 1,
                                    bgcolor: 'lightBlue',
                                    borderRadius: 1,
                                }}>
                                <DisplayObject object={singleData} />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </>
        ) : (
            <span>Nodata present</span>
        )}
    </Stack>
);
export default CardDisplay;
