import React from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const BlurBackground = styled('div')(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: open ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
  backdropFilter: open ? 'blur(10px)' : 'none',
  zIndex: open ? 1200 : -1,
  pointerEvents: open ? 'auto' : 'none',
  transition: 'backdrop-filter 0.3s ease-in-out',
}));

export default function ConfirmationDialog({ open, onClose, onConfirm, message }) {
  return (
    <>
      <BlurBackground open={open} />
      <TrapFocus open={open} disableAutoFocus disableEnforceFocus>
        <Fade appear={false} in={open}>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-label="Confirmation dialog"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              p: 2,
              width: '90%',
              maxWidth: '400px',
              borderWidth: 0,
              borderTopWidth: 1,
              zIndex: 1300, // Ensure dialog is above the blurred background
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              gap={2}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography fontWeight="bold">Confirmation</Typography>
                <Typography variant="body2">{message}</Typography>
              </Box>
              <Stack
                gap={2}
                direction={{
                  xs: 'row-reverse',
                  sm: 'row',
                }}
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-end', sm: 'center' },
                }}
              >
                <Button size="small" onClick={onConfirm} variant="contained">
                  Yes
                </Button>
                <Button size="small" onClick={onClose}>
                  No
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </>
  );
}
