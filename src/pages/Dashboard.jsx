import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { fetchEmployees } from '@/features/employees/employeeThunks';
import { fetchCountries } from '@/features/countries/countryThunks';
import { selectAllEmployees, selectEmployeesLoading } from '@/features/employees/employeeSelectors';
import { selectAllCountries } from '@/features/countries/countrySelectors';

import StatCard from '@/components/dashboard/StatCard';
import RecentEmployees from '@/components/dashboard/RecentEmployees';
import PageHeader from '@/components/common/PageHeader';
import { StatCardSkeletonLoader } from '@/components/common/SkeletonLoader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector(selectAllEmployees);
  const loading = useSelector(selectEmployeesLoading);
  const countries = useSelector(selectAllCountries);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchCountries());
  }, [dispatch]);

  const uniqueCountries = [...new Set(employees.map((e) => e.country).filter(Boolean))].length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's a summary of your workforce."
        action={
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate('/add-employee')}
            size="medium"
            aria-label="Add new employee"
          >
            Add Employee
          </Button>
        }
      />

      {/* Stat Cards */}
      {loading && employees.length === 0 ? (
        <StatCardSkeletonLoader />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
            mb: 3,
          }}
        >
          <StatCard
            icon={<PeopleRoundedIcon sx={{ fontSize: 24 }} />}
            label="Total Employees"
            value={employees.length}
            trend="up"
            trendLabel="Active workforce"
            color="#6366f1"
            bgColor="#eef2ff"
          />
          <StatCard
            icon={<PublicRoundedIcon sx={{ fontSize: 24 }} />}
            label="Countries"
            value={countries.length || uniqueCountries}
            trend="neutral"
            trendLabel="Nationalities present"
            color="#06b6d4"
            bgColor="#ecfeff"
          />
          <StatCard
            icon={<GroupsRoundedIcon sx={{ fontSize: 24 }} />}
            label="Recently Added"
            value={employees.slice(0, 5).length}
            trend="up"
            trendLabel="Last 5 records"
            color="#10b981"
            bgColor="#d1fae5"
          />
        </Box>
      )}

      {/* Quick action & Recent Employees */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Quick Actions Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="card-body">
            {[
              {
                label: 'Add New Employee',
                desc: 'Create a new employee record',
                icon: <PersonAddRoundedIcon sx={{ fontSize: 20 }} />,
                to: '/add-employee',
                color: 'var(--color-primary)',
                bg: 'var(--color-primary-50)',
              },
              {
                label: 'View All Employees',
                desc: 'Browse and manage employees',
                icon: <PeopleRoundedIcon sx={{ fontSize: 20 }} />,
                to: '/employees',
                color: '#06b6d4',
                bg: '#ecfeff',
              },
              {
                label: 'Search Employee',
                desc: 'Find employee by ID',
                icon: <GroupsRoundedIcon sx={{ fontSize: 20 }} />,
                to: '/search',
                color: '#10b981',
                bg: '#d1fae5',
              },
            ].map((item) => (
              <Box
                key={item.to}
                role="button"
                tabIndex={0}
                onClick={() => navigate(item.to)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(item.to)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  mb: 0.5,
                  transition: 'background var(--transition-fast)',
                  '&:hover': { bgcolor: 'var(--color-surface-2)' },
                }}
                aria-label={item.label}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Box sx={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {item.label}
                  </Box>
                  <Box sx={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{item.desc}</Box>
                </Box>
              </Box>
            ))}
          </div>
        </div>

        {/* Recent Employees */}
        <RecentEmployees employees={employees} />
      </Box>
    </div>
  );
};

export default Dashboard;
