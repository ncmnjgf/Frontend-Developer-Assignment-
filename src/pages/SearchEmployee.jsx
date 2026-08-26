import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

import { fetchEmployeeById } from '@/features/employees/employeeThunks';
import {
  selectSelectedEmployee,
  selectSearchLoading,
  selectEmployeesError,
} from '@/features/employees/employeeSelectors';
import { clearSelectedEmployee } from '@/features/employees/employeeSlice';

import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

const getAvatarColor = (id) => {
  const colors = [
    'linear-gradient(135deg, #6366f1, #4f46e5)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #10b981, #059669)',
  ];
  return colors[parseInt(id || '0') % colors.length];
};

const SearchEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector(selectSelectedEmployee);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectEmployeesError);

  const [searchId, setSearchId] = useState('');
  const [inputError, setInputError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchId.trim()) {
      setInputError('Please enter an Employee ID.');
      return;
    }
    if (!/^\d+$/.test(searchId.trim())) {
      setInputError('Employee ID must be numeric.');
      return;
    }
    setInputError('');
    setHasSearched(true);
    dispatch(clearSelectedEmployee());
    dispatch(fetchEmployeeById(searchId.trim()));
  };

  const handleIdChange = (val) => {
    setSearchId(val);
    if (inputError) setInputError('');
  };

  const renderResult = () => {
    if (loading) return <LoadingSpinner message="Searching for employee…" />;

    if (error && hasSearched) {
      return (
        <Box className="state-container">
          <Box className="state-icon error">
            <PersonSearchRoundedIcon sx={{ fontSize: 36 }} />
          </Box>
          <h2 className="state-title">Employee Not Found</h2>
          <p className="state-desc">
            We couldn&apos;t find an employee with ID <strong>&ldquo;{searchId}&rdquo;</strong>.<br />
            Please verify the ID and try again.
          </p>
        </Box>
      );
    }

    if (employee && hasSearched) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
            gap: 3,
            pt: 3,
          }}
        >
          {/* Profile */}
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: getAvatarColor(employee.id),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 24,
                fontWeight: 800,
                margin: '0 auto 12px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {getInitials(employee.name)}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {employee.name}
            </Typography>
            <Box sx={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 600, mb: 1 }}>
              #{employee.id}
            </Box>
            <Chip
              label={employee.country || '—'}
              size="small"
              sx={{ bgcolor: 'var(--color-primary-100)', color: 'var(--color-primary-dark)', fontWeight: 600 }}
            />
          </Box>

          {/* Details */}
          <Box>
            {[
              { icon: <EmailRoundedIcon sx={{ fontSize: 16 }} />, label: 'Email', value: employee.email },
              { icon: <PhoneRoundedIcon sx={{ fontSize: 16 }} />, label: 'Mobile', value: employee.mobile },
              { icon: <PublicRoundedIcon sx={{ fontSize: 16 }} />, label: 'Country', value: employee.country },
              { icon: <LocationOnRoundedIcon sx={{ fontSize: 16 }} />, label: 'State', value: employee.state },
              { icon: <LocationOnRoundedIcon sx={{ fontSize: 16 }} />, label: 'District', value: employee.district },
            ].map((row) => (
              <Box
                key={row.label}
                sx={{
                  display: 'flex',
                  gap: 2,
                  py: 1.5,
                  borderBottom: '1px solid var(--color-border-light)',
                  alignItems: 'center',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Box sx={{ color: 'var(--color-primary)', flexShrink: 0 }}>{row.icon}</Box>
                <Box sx={{ fontSize: 12, color: 'var(--color-text-tertiary)', width: 70, flexShrink: 0, fontWeight: 600 }}>
                  {row.label}
                </Box>
                <Box sx={{ fontSize: 14, color: 'var(--color-text-primary)', fontWeight: 500 }}>
                  {row.value || '—'}
                </Box>
              </Box>
            ))}

            <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<EditRoundedIcon />}
                onClick={() => navigate(`/employees/${employee.id}/edit`)}
              >
                Edit Employee
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(`/employees/${employee.id}`)}
                sx={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                Full Details
              </Button>
            </Box>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <div>
      <PageHeader
        title="Search Employee"
        subtitle="Find any employee instantly by their unique ID."
      />

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Search by Employee ID</h2>
        </div>
        <div className="card-body">
          <SearchBar
            value={searchId}
            onChange={handleIdChange}
            onSearch={handleSearch}
            loading={loading}
            placeholder="Enter Employee ID (e.g. 5)"
            error={inputError}
          />
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default SearchEmployee;
