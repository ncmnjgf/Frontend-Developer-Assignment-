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
            color="#8b5cf6"
            bgColor="rgba(139, 92, 246, 0.15)"
          />
          <StatCard
            icon={<PublicRoundedIcon sx={{ fontSize: 24 }} />}
            label="Countries"
            value={countries.length || uniqueCountries}
            trend="neutral"
            trendLabel="Nationalities present"
            color="#06b6d4"
            bgColor="rgba(6, 182, 212, 0.15)"
          />
          <StatCard
            icon={<GroupsRoundedIcon sx={{ fontSize: 24 }} />}
            label="Recently Added"
            value={employees.slice(0, 5).length}
            trend="up"
            trendLabel="Last 5 records"
            color="#10b981"
            bgColor="rgba(16, 185, 129, 0.15)"
          />
        </Box>
      )}

      {/* Quick action & Recent Employees */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Employee Distribution Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Top Countries</h2>
          </div>
          <div className="card-body">
            {Object.entries(
              employees.reduce((acc, emp) => {
                const country = emp.country
                  ? emp.country.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
                  : 'Unknown';
                acc[country] = (acc[country] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([country, count], idx) => {
                const percentage = Math.round((count / Math.max(employees.length, 1)) * 100);
                const colors = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
                const color = colors[idx % colors.length];

                return (
                  <Box key={country} sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box sx={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{country}</Box>
                      <Box sx={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{count} ({percentage}%)</Box>
                    </Box>
                    <Box sx={{ width: '100%', height: 6, bgcolor: 'var(--color-surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                      <Box sx={{ width: `${percentage}%`, height: '100%', bgcolor: color, borderRadius: 4 }} />
                    </Box>
                  </Box>
                );
              })}
            {employees.length === 0 && (
              <Box sx={{ color: 'var(--color-text-tertiary)', fontSize: 14, textAlign: 'center', py: 4 }}>
                No data available
              </Box>
            )}
          </div>
        </div>

        {/* Recent Employees */}
        <RecentEmployees employees={employees} />
      </Box>
    </div>
  );
};

export default Dashboard;
