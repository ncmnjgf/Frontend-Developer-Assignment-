import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { fetchEmployeeById, deleteEmployee } from '@/features/employees/employeeThunks';
import {
  selectSelectedEmployee,
  selectSearchLoading,
  selectEmployeesError,
  selectOperationLoading,
} from '@/features/employees/employeeSelectors';
import { clearSelectedEmployee } from '@/features/employees/employeeSlice';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';
import EmployeeDetailsComponent from '@/components/employees/EmployeeDetails';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const EmployeeDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const employee = useSelector(selectSelectedEmployee);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectEmployeesError);
  const operationLoading = useSelector(selectOperationLoading);

  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    return () => { dispatch(clearSelectedEmployee()); };
  }, [dispatch, id]);

  const handleDeleteConfirm = async () => {
    const result = await dispatch(deleteEmployee(id));
    if (deleteEmployee.fulfilled.match(result)) {
      enqueueSnackbar(`${employee.name} was deleted successfully.`, { variant: 'success' });
      navigate('/employees');
    } else {
      enqueueSnackbar('Failed to delete employee.', { variant: 'error' });
      setDeleteOpen(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading employee details…" />;
  if (error)
    return (
      <ErrorState
        title="Employee Not Found"
        description={`We couldn't find an employee with ID "${id}".`}
        onRetry={() => dispatch(fetchEmployeeById(id))}
      />
    );
  if (!employee) return null;

  return (
    <>
      <EmployeeDetailsComponent employee={employee} onDelete={() => setDeleteOpen(true)} />
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee?"
        employeeName={employee.name}
        loading={operationLoading}
      />
    </>
  );
};

export default EmployeeDetailsPage;
