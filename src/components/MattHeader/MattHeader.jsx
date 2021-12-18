import React, { useState } from 'react';
import { Box, Collapse } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const MattHeader = ({ bgColour = blueGrey[500] }) => {
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
                bgcolor: bgColour,
                borderRadius: '5px',
                color: blueGrey[50],
                textAlign: 'right',
                verticalAlign: 'top',
                float: 'right',
                padding: '3px',
                height: '23px',
                overflow: 'hidden',
            }}>
            <Collapse orientation='horizontal' in={mouseOver} collapsedSize={22} timeout={300}>
                &gt;&nbsp;
                <span>Made by Matthew McParland</span>
                &nbsp;&nbsp;
                <a href='https://github.com/MatthewMcP' target='_blank' rel='noopener noreferrer'>
                    <GitHubIcon sx={{ color: 'white' }} fontSize='small' />
                </a>
                &nbsp;&nbsp;
                <a href='https://www.linkedin.com/in/mmcparland/' target='_blank' rel='noopener noreferrer'>
                    <LinkedInIcon sx={{ color: 'white' }} fontSize='small' />
                </a>
                &nbsp;&nbsp;
                <a href='mailto:matthew.mcparland@gmail.com' target='_blank' rel='noopener noreferrer'>
                    <EmailIcon sx={{ color: 'white' }} fontSize='small' />
                </a>
                &nbsp;
            </Collapse>
        </Box>
    );
};

export default MattHeader;
