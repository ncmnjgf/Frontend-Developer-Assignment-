import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

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

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();
  const location = [employee.district, employee.state, employee.country]
    .filter(Boolean)
    .join(', ');

  return (
    <article className="employee-card" aria-label={`Employee: ${employee.name}`}>
      <div className="employee-card-header">
        <div
          className="employee-avatar"
          style={{ width: 44, height: 44, fontSize: 15, background: getAvatarColor(employee.id) }}
          aria-hidden="true"
        >
          {getInitials(employee.name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="employee-name" style={{ fontSize: 15 }}>{employee.name}</div>
          <span className="employee-id-badge">#{employee.id}</span>
        </div>
        {employee.country && (
          <span className="badge badge-primary">
            {employee.country.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')}
          </span>
        )}
      </div>

      <div className="employee-card-info">
        <div className="employee-card-row">
          <EmailRoundedIcon sx={{ fontSize: 14 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {employee.email}
          </span>
        </div>
        {employee.mobile && (
          <div className="employee-card-row">
            <PhoneRoundedIcon sx={{ fontSize: 14 }} />
            <span>{employee.mobile}</span>
          </div>
        )}
        {location && (
          <div className="employee-card-row">
            <LocationOnRoundedIcon sx={{ fontSize: 14 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {location}
            </span>
          </div>
        )}
      </div>

      <div className="employee-card-actions">
        <Button
          size="small"
          variant="outlined"
          startIcon={<EditRoundedIcon sx={{ fontSize: 14 }} />}
          onClick={() => navigate(`/employees/${employee.id}/edit`)}
          aria-label={`Edit ${employee.name}`}
          sx={{ flex: 1, fontSize: 12, py: 0.5, borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteRoundedIcon sx={{ fontSize: 14 }} />}
          onClick={() => onDelete(employee)}
          aria-label={`Delete ${employee.name}`}
          sx={{ flex: 1, fontSize: 12, py: 0.5 }}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export default EmployeeCard;
