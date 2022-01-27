import React, { Fragment, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const HeadersAccordion = ({ headers, setHeaders }) => {
    const [keyInput, setKeyInput] = useState('');
    const [keyInputErrored, setKeyInputErrored] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [valueInputErrored, setValueInputErrored] = useState(false);

    const addToHeaders = () => {
        if (keyInput === '') {
            setKeyInputErrored(true);
        } else {
            setKeyInputErrored(false);
        }

        if (valueInput === '') {
            setValueInputErrored(true);
        } else {
            setValueInputErrored(false);
        }
        if (keyInput && valueInput) {
            setHeaders((oldArray) => [...oldArray, { key: keyInput, value: valueInput }]);
            setKeyInput('');
            setValueInput('');
        }
    };

    const removeFromHeaders = (i) => {
        setHeaders((oldArray) => {
            oldArray.splice(i, 1);
            return [...oldArray];
        });
    };

    return (
        <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Headers</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>KEY</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>VALUE</Typography>
                        </Grid>
                        {headers.map((header, i) => (
                            <Fragment key={header.key}>
                                <Grid item xs={5}>
                                    <Typography variant='standard'>{header.key}</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant='standard'>{header.value}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <RemoveCircleIcon onClick={() => removeFromHeaders(i)} />
                                </Grid>
                            </Fragment>
                        ))}
                        <Grid item xs={5}>
                            <TextField
                                variant='standard'
                                value={keyInput}
                                onChange={(event) => setKeyInput(event.target.value)}
                                error={keyInputErrored}
                                helperText={keyInputErrored ? 'Must have value.' : ''}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                variant='standard'
                                value={valueInput}
                                onChange={(event) => setValueInput(event.target.value)}
                                error={valueInputErrored}
                                helperText={valueInputErrored ? 'Must have value.' : ''}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <AddCircleIcon onClick={addToHeaders} />
                        </Grid>
                    </Grid>
                </>
            </AccordionDetails>
        </Accordion>
    );
};

export default HeadersAccordion;
