import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

const getAvatarColor = (id) => {
  const colors = [
    'linear-gradient(135deg, #6366f1, #4f46e5)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #ec4899, #db2777)',
  ];
  return colors[parseInt(id || '0') % colors.length];
};

const DetailRow = ({ icon, label, value }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      py: 2,
      borderBottom: '1px solid var(--color-border-light)',
      alignItems: 'center',
      '&:last-child': { borderBottom: 'none' },
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: 2,
        bgcolor: 'var(--color-primary-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-primary)',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Box sx={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.3 }}>
        {label}
      </Box>
      <Box sx={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
        {value || '—'}
      </Box>
    </Box>
  </Box>
);

const EmployeeDetailsComponent = ({ employee, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Back button */}
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate('/employees')}
        sx={{ mb: 3, color: 'var(--color-text-secondary)', fontWeight: 600 }}
      >
        Back to Employees
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3, alignItems: 'start' }}>
        {/* Profile card */}
        <Box className="card">
          <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid var(--color-border-light)' }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: getAvatarColor(employee.id),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
                fontWeight: 800,
                margin: '0 auto 12px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              aria-hidden="true"
            >
              {getInitials(employee.name)}
            </Box>
            <Box sx={{ fontSize: 20, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", mb: 0.5 }}>
              {employee.name}
            </Box>
            <Chip
              label={employee.country || 'Unknown'}
              size="small"
              sx={{ bgcolor: 'var(--color-primary-100)', color: 'var(--color-primary-dark)', fontWeight: 600 }}
            />
            <Box sx={{ mt: 2, fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              EMPLOYEE ID
            </Box>
            <Box sx={{ fontSize: 18, fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace' }}>
              #{employee.id}
            </Box>
          </Box>

          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<EditRoundedIcon />}
              onClick={() => navigate(`/employees/${employee.id}/edit`)}
              fullWidth
              size="small"
              aria-label={`Edit ${employee.name}`}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteRoundedIcon />}
              onClick={() => onDelete(employee)}
              fullWidth
              size="small"
              aria-label={`Delete ${employee.name}`}
            >
              Delete
            </Button>
          </Box>
        </Box>

        {/* Detail card */}
        <Box className="card">
          <div className="card-header">
            <h2 className="card-title">Contact & Location Information</h2>
          </div>
          <div className="card-body">
            <DetailRow icon={<EmailRoundedIcon sx={{ fontSize: 18 }} />} label="Email Address" value={employee.email} />
            <DetailRow icon={<PhoneRoundedIcon sx={{ fontSize: 18 }} />} label="Mobile Number" value={employee.mobile} />
            <DetailRow icon={<PublicRoundedIcon sx={{ fontSize: 18 }} />} label="Country" value={employee.country} />
            <DetailRow icon={<LocationOnRoundedIcon sx={{ fontSize: 18 }} />} label="State / Province" value={employee.state} />
            <DetailRow icon={<LocationOnRoundedIcon sx={{ fontSize: 18 }} />} label="District / City" value={employee.district} />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDetailsComponent;
