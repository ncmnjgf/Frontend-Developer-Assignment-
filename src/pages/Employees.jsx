import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { fetchEmployees, deleteEmployee } from '@/features/employees/employeeThunks';
import {
  selectAllEmployees,
  selectEmployeesLoading,
  selectEmployeesError,
  selectOperationLoading,
} from '@/features/employees/employeeSelectors';

import PageHeader from '@/components/common/PageHeader';
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeCard from '@/components/employees/EmployeeCard';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import SkeletonLoader from '@/components/common/SkeletonLoader';
import ErrorState from '@/components/common/ErrorState';

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery('(max-width:768px)');

  const employees = useSelector(selectAllEmployees);
  const loading = useSelector(selectEmployeesLoading);
  const error = useSelector(selectEmployeesError);
  const operationLoading = useSelector(selectOperationLoading);

  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 15;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!search.trim()) return employees;
    const q = search.toLowerCase();
    return employees.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.country?.toLowerCase().includes(q) ||
        String(e.id).includes(q)
    );
  }, [employees, search]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const paginatedEmployees = useMemo(() => {
    return filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleDeleteRequest = (emp) => setDeleteTarget(emp);
  const handleDeleteCancel = () => setDeleteTarget(null);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deleteEmployee(deleteTarget.id));
    if (deleteEmployee.fulfilled.match(result)) {
      enqueueSnackbar(`${deleteTarget.name} was deleted successfully.`, { variant: 'success' });
    } else {
      enqueueSnackbar('Failed to delete employee. Please try again.', { variant: 'error' });
    }
    setDeleteTarget(null);
  };

  const renderContent = () => {
    if (loading && employees.length === 0) {
      return <SkeletonLoader type={isMobile ? 'card' : 'table'} rows={6} count={4} />;
    }
    if (error && employees.length === 0) {
      return (
        <ErrorState
          title="Failed to load employees"
          description="We couldn't load the employee list. Please check your connection and try again."
          onRetry={() => dispatch(fetchEmployees())}
        />
      );
    }
    if (isMobile) {
      return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          {paginatedEmployees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} onDelete={handleDeleteRequest} />
          ))}
        </Box>
      );
    }
    return <EmployeeTable employees={paginatedEmployees} onDelete={handleDeleteRequest} />;
  };

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} employee${employees.length !== 1 ? 's' : ''} in total`}
        action={
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate('/add-employee')}
            aria-label="Add new employee"
          >
            Add Employee
          </Button>
        }
      />

      {/* Search filter */}
      <Box sx={{ mb: 2.5 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, email, country, or ID…"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ fontSize: 18, color: 'var(--color-text-tertiary)' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: '100%', sm: 360 } }}
          aria-label="Filter employees"
        />
      </Box>

      <div className="card">
        {renderContent()}
        {filtered.length > 0 && (
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[15]}
            sx={{
              borderTop: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              '.MuiTablePagination-selectIcon': { color: 'var(--color-text-tertiary)' },
            }}
          />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee?"
        employeeName={deleteTarget?.name}
        loading={operationLoading}
      />
    </div>
  );
};

export default Employees;
