import React from 'react';
import Button from '@mui/material/Button';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const ErrorState = ({
  title = 'Something went wrong',
  description = "We couldn't complete your request. Please try again.",
  onRetry,
  retryLabel = 'Try Again',
}) => (
  <div className="state-container" role="alert" aria-live="assertive">
    <div className="state-icon error">
      <ErrorOutlineRoundedIcon sx={{ fontSize: 36 }} />
    </div>
    <h2 className="state-title">{title}</h2>
    <p className="state-desc">{description}</p>
    {onRetry && (
      <Button
        variant="contained"
        startIcon={<RefreshRoundedIcon />}
        onClick={onRetry}
        sx={{ mt: 1 }}
      >
        {retryLabel}
      </Button>
    )}
  </div>
);

export default ErrorState;
