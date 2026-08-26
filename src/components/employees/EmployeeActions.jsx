import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const EmployeeActions = ({ employee, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <Tooltip title="View Details">
        <button
          className="action-btn view"
          onClick={() => navigate(`/employees/${employee.id}`)}
          aria-label={`View details for ${employee.name}`}
        >
          <VisibilityRoundedIcon sx={{ fontSize: 15 }} />
        </button>
      </Tooltip>
      <Tooltip title="Edit Employee">
        <button
          className="action-btn edit"
          onClick={() => navigate(`/employees/${employee.id}/edit`)}
          aria-label={`Edit ${employee.name}`}
        >
          <EditRoundedIcon sx={{ fontSize: 15 }} />
        </button>
      </Tooltip>
      <Tooltip title="Delete Employee">
        <button
          className="action-btn delete"
          onClick={() => onDelete(employee)}
          aria-label={`Delete ${employee.name}`}
        >
          <DeleteRoundedIcon sx={{ fontSize: 15 }} />
        </button>
      </Tooltip>
    </div>
  );
};

export default EmployeeActions;
