import React from 'react';
import Button from '@mui/material/Button';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

const icons = {
  employees: <PeopleOutlineRoundedIcon sx={{ fontSize: 36 }} />,
  search: <SearchOffRoundedIcon sx={{ fontSize: 36 }} />,
};

const EmptyState = ({
  title = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  actionLabel,
  onAction,
  icon = 'employees',
}) => (
  <div className="state-container" aria-label={title}>
    <div className="state-icon empty">
      {typeof icon === 'string' ? icons[icon] || icons.employees : icon}
    </div>
    <h2 className="state-title">{title}</h2>
    <p className="state-desc">{description}</p>
    {actionLabel && onAction && (
      <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
