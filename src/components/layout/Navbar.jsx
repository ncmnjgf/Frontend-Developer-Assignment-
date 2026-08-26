import React from 'react';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

const breadcrumbMap = {
  '/': 'Dashboard',
  '/employees': 'Employees',
  '/add-employee': 'Add Employee',
  '/search': 'Search Employee',
};

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/employees/') && path.includes('/edit')) return 'Edit Employee';
    if (path.includes('/employees/') && !path.includes('/edit')) return 'Employee Details';
    return breadcrumbMap[path] || 'Employee Management';
  };

  const getTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        <IconButton
          className="mobile-only"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          size="small"
          sx={{ color: 'var(--color-text-secondary)' }}
        >
          <MenuRoundedIcon />
        </IconButton>

        <div className="navbar-breadcrumb">
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 14 }}>EmpTrack</span>
          <span className="navbar-breadcrumb-sep">/</span>
          <span className="navbar-breadcrumb-current">{getBreadcrumb()}</span>
        </div>
      </div>

      <div className="navbar-right">
        <Chip
          icon={<WbSunnyRoundedIcon sx={{ fontSize: '14px !important' }} />}
          label={`${getTime()}, Admin`}
          size="small"
          sx={{
            bgcolor: 'var(--color-primary-50)',
            color: 'var(--color-primary-dark)',
            fontWeight: 600,
            fontSize: 12,
            border: '1px solid var(--color-primary-100)',
            display: { xs: 'none', sm: 'flex' },
          }}
        />
        <IconButton
          aria-label="Notifications"
          size="small"
          sx={{ color: 'var(--color-text-secondary)' }}
        >
          <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
            <NotificationsNoneRoundedIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>
        <div className="navbar-avatar" role="img" aria-label="Admin user avatar">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
