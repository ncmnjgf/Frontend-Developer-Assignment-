import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CircularProgress from '@mui/material/CircularProgress';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  employeeName,
  loading = false,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogContent sx={{ p: 4, textAlign: 'center' }}>
      <Box className="confirm-dialog-icon">
        <DeleteOutlineRoundedIcon sx={{ fontSize: 28, color: 'var(--color-error)' }} />
      </Box>

      <Typography
        id="confirm-dialog-title"
        variant="h6"
        sx={{ fontWeight: 700, mb: 1, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {title}
      </Typography>

      {employeeName && (
        <Typography
          id="confirm-dialog-description"
          variant="body2"
          sx={{ color: 'var(--color-text-secondary)', mb: 0.5, lineHeight: 1.6 }}
        >
          Are you sure you want to delete{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>{employeeName}</strong>?
        </Typography>
      )}

      {message && (
        <Typography variant="body2" sx={{ color: 'var(--color-text-tertiary)', mb: 0, lineHeight: 1.6 }}>
          {message}
        </Typography>
      )}

      <Typography variant="caption" sx={{ color: 'var(--color-text-tertiary)', display: 'block', mt: 1, mb: 3 }}>
        This action cannot be undone.
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{
            flex: 1,
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
            '&:hover': { borderColor: 'var(--color-text-secondary)', bgcolor: 'transparent' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          aria-label="Confirm delete"
          sx={{ flex: 1, bgcolor: 'var(--color-error)', '&:hover': { bgcolor: '#dc2626' } }}
          startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
        >
          {loading ? 'Deleting…' : 'Delete Employee'}
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);

export default ConfirmDialog;
