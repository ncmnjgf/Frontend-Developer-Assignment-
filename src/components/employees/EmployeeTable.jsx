import React from 'react';
import EmptyState from '@/components/common/EmptyState';
import EmployeeActions from './EmployeeActions';
import { useNavigate } from 'react-router-dom';

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

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

const EmployeeTable = ({ employees, onDelete }) => {
  const navigate = useNavigate();

  if (!employees || employees.length === 0) {
    return (
      <EmptyState
        title="No employees yet"
        description="Add your first employee to start managing records."
        actionLabel="+ Add Employee"
        onAction={() => navigate('/add-employee')}
      />
    );
  }

  return (
    <div className="table-wrapper">
      <table className="employee-table" role="table" aria-label="Employee list">
        <thead>
          <tr>
            <th scope="col">Employee</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Country</th>
            <th scope="col">Location</th>
            <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} role="row">
              <td>
                <div className="employee-name-cell">
                  <div
                    className="employee-avatar"
                    style={{ background: getAvatarColor(emp.id) }}
                    aria-hidden="true"
                  >
                    {getInitials(emp.name)}
                  </div>
                  <div>
                    <div className="employee-name">{emp.name}</div>
                    <span className="employee-id-badge">#{emp.id}</span>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>
                {emp.email}
              </td>
              <td style={{ color: 'var(--color-text-secondary)', fontSize: 13, whiteSpace: 'nowrap' }}>
                {emp.mobile}
              </td>
              <td>
                <span className="badge badge-primary">
                  {emp.country
                    ? emp.country.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
                    : '—'}
                </span>
              </td>
              <td style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>
                {[emp.district, emp.state].filter(Boolean).join(', ') || '—'}
              </td>
              <td style={{ textAlign: 'center' }}>
                <EmployeeActions employee={emp} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
