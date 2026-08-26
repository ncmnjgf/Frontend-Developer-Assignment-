import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';

import { fetchEmployeeById, updateEmployee } from '@/features/employees/employeeThunks';
import { fetchCountries } from '@/features/countries/countryThunks';
import {
  selectSelectedEmployee,
  selectSearchLoading,
  selectOperationLoading,
  selectEmployeesError,
} from '@/features/employees/employeeSelectors';
import { selectAllCountries } from '@/features/countries/countrySelectors';
import { clearSelectedEmployee } from '@/features/employees/employeeSlice';

import PageHeader from '@/components/common/PageHeader';
import EmployeeForm from '@/components/employees/EmployeeForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/components/common/ErrorState';

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const employee = useSelector(selectSelectedEmployee);
  const searchLoading = useSelector(selectSearchLoading);
  const operationLoading = useSelector(selectOperationLoading);
  const error = useSelector(selectEmployeesError);
  const countries = useSelector(selectAllCountries);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    dispatch(fetchCountries());
    return () => { dispatch(clearSelectedEmployee()); };
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    const result = await dispatch(updateEmployee({ id, data }));
    if (updateEmployee.fulfilled.match(result)) {
      enqueueSnackbar('Employee updated successfully!', { variant: 'success' });
      navigate('/employees');
    } else {
      enqueueSnackbar(result.payload || 'Failed to update employee.', { variant: 'error' });
    }
  };

  if (searchLoading) return <LoadingSpinner message="Loading employee data…" />;
  if (error)
    return (
      <ErrorState
        title="Employee Not Found"
        description={`We couldn't find an employee with ID "${id}".`}
        onRetry={() => dispatch(fetchEmployeeById(id))}
        retryLabel="Try Again"
      />
    );

  return (
    <div>
      <PageHeader
        title="Edit Employee"
        subtitle={employee ? `Editing record for ${employee.name}` : 'Update employee information'}
      />

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Employee Information</h2>
        </div>
        <div className="card-body">
          {employee && (
            <EmployeeForm
              defaultValues={{
                name: employee.name || '',
                email: employee.email || '',
                mobile: employee.mobile || '',
                country: employee.country || '',
                state: employee.state || '',
                district: employee.district || '',
              }}
              countries={countries}
              onSubmit={handleSubmit}
              loading={operationLoading}
              isEdit
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
