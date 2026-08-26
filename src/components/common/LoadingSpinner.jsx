import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <Box
    className="state-container"
    role="status"
    aria-label={message}
    aria-live="polite"
  >
    <CircularProgress
      size={48}
      thickness={3}
      sx={{ color: 'var(--color-primary)', mb: 2 }}
    />
    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
      {message}
    </Typography>
  </Box>
);

export default LoadingSpinner;
