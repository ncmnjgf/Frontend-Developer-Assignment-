import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';

const navItems = [
  { label: 'Dashboard', icon: <DashboardRoundedIcon sx={{ fontSize: 18 }} />, to: '/' },
  { label: 'Employees', icon: <PeopleRoundedIcon sx={{ fontSize: 18 }} />, to: '/employees' },
  { label: 'Add Employee', icon: <PersonAddRoundedIcon sx={{ fontSize: 18 }} />, to: '/add-employee' },
  { label: 'Search by ID', icon: <SearchRoundedIcon sx={{ fontSize: 18 }} />, to: '/search' },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <BusinessCenterRoundedIcon sx={{ fontSize: 20 }} />
          </div>
          <div>
            <div className="sidebar-logo-text">EmpTrack</div>
            <div className="sidebar-logo-sub">Admin Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <div className="sidebar-section-label">Main Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
              aria-current={location.pathname === item.to ? 'page' : undefined}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 10,
              background: 'var(--color-surface-2)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Admin User
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Super Admin</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
