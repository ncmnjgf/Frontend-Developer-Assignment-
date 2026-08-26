import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { createEmployee } from '@/features/employees/employeeThunks';
import { fetchCountries } from '@/features/countries/countryThunks';
import { selectOperationLoading } from '@/features/employees/employeeSelectors';
import { selectAllCountries } from '@/features/countries/countrySelectors';

import PageHeader from '@/components/common/PageHeader';
import EmployeeForm from '@/components/employees/EmployeeForm';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loading = useSelector(selectOperationLoading);
  const countries = useSelector(selectAllCountries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmit = async (data) => {
    const result = await dispatch(createEmployee(data));
    if (createEmployee.fulfilled.match(result)) {
      enqueueSnackbar('Employee created successfully!', { variant: 'success' });
      navigate('/employees');
    } else {
      enqueueSnackbar(result.payload || 'Failed to create employee.', { variant: 'error' });
    }
  };

  return (
    <div>
      <PageHeader
        title="Add Employee"
        subtitle="Fill in the details below to add a new employee record."
      />

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Employee Information</h2>
        </div>
        <div className="card-body">
          <EmployeeForm
            countries={countries}
            onSubmit={handleSubmit}
            loading={loading}
            isEdit={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
