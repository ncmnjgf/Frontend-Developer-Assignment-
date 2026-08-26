import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

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

const RecentEmployees = ({ employees = [] }) => {
  const navigate = useNavigate();
  const recent = employees.slice(0, 5);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Recently Added</h2>
        <Button
          size="small"
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />}
          onClick={() => navigate('/employees')}
          sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: 12 }}
        >
          View All
        </Button>
      </div>
      <div className="card-body" style={{ padding: '4px 24px 16px' }}>
        {recent.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: '24px 0', fontSize: 14 }}>
            No employees yet.
          </p>
        ) : (
          recent.map((emp) => (
            <div
              key={emp.id}
              className="recent-employee-row"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/employees/${emp.id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/employees/${emp.id}`)}
              style={{ cursor: 'pointer' }}
              aria-label={`View employee ${emp.name}`}
            >
              <div
                className="employee-avatar"
                style={{ background: getAvatarColor(emp.id), flexShrink: 0 }}
                aria-hidden="true"
              >
                {getInitials(emp.name)}
              </div>
              <div className="recent-employee-info">
                <div className="recent-employee-name">{emp.name}</div>
                <div className="recent-employee-email">{emp.email}</div>
              </div>
              <span className="badge badge-primary" style={{ flexShrink: 0 }}>
                {emp.country || '—'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentEmployees;
