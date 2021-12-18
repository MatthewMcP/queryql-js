import React, { useState } from 'react';
import { Box, Collapse } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const MattHeader = () => {
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <Box
            onMouseOver={() => {
                setMouseOver(true);
            }}
            onMouseLeave={() => {
                setMouseOver(false);
            }}
            sx={{
                bgcolor: blueGrey[500],
                borderRadius: '5px',
                color: blueGrey[50],
                textAlign: 'right',
                verticalAlign: 'top',
                float: 'right',
                padding: '3px',
            }}>
            <Collapse orientation='horizontal' in={mouseOver} collapsedSize={23} timeout={200}>
                {mouseOver ? (
                    <>
                        <span pb='10px'>Made by Matthew McParland</span>
                        {'    '}
                        <a href='https://github.com/MatthewMcP' target='_blank' rel='noopener noreferrer'>
                            <GitHubIcon sx={{ color: 'white' }} fontSize='small' />
                        </a>
                        {'    '}
                        <a href='https://www.linkedin.com/in/mmcparland/' target='_blank' rel='noopener noreferrer'>
                            <LinkedInIcon sx={{ color: 'white' }} fontSize='small' />
                        </a>
                        {'    '}
                        <a href='mailto:matthew.mcparland@gmail.com' target='_blank' rel='noopener noreferrer'>
                            <EmailIcon sx={{ color: 'white' }} fontSize='small' />
                        </a>{' '}
                    </>
                ) : (
                    <>&nbsp;&gt;&nbsp;</>
                )}
            </Collapse>
        </Box>
    );
};

export default MattHeader;
