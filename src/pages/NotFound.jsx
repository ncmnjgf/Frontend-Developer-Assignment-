import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="state-container" style={{ minHeight: '80vh' }}>
      <Box
        sx={{
          fontSize: 96,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          mb: 1,
        }}
      >
        404
      </Box>
      <h1 className="state-title" style={{ fontSize: 22 }}>Page Not Found</h1>
      <p className="state-desc">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button
        variant="contained"
        startIcon={<HomeRoundedIcon />}
        onClick={() => navigate('/')}
        aria-label="Return to dashboard"
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
