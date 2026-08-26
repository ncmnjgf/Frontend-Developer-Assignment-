import { describe, it, expect } from 'vitest';
import employeeReducer, {
  clearSelectedEmployee,
  clearError,
} from '@/features/employees/employeeSlice';
import {
  fetchEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '@/features/employees/employeeThunks';

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  searchLoading: false,
  operationLoading: false,
};

const sampleEmployee = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  mobile: '9876543210',
  country: 'India',
  state: 'Maharashtra',
  district: 'Mumbai',
};

describe('employeeSlice', () => {
  it('should return initial state', () => {
    expect(employeeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('clearSelectedEmployee — resets selectedEmployee and error', () => {
    const state = { ...initialState, selectedEmployee: sampleEmployee, error: 'Some error' };
    const next = employeeReducer(state, clearSelectedEmployee());
    expect(next.selectedEmployee).toBeNull();
    expect(next.error).toBeNull();
  });

  it('clearError — clears error', () => {
    const state = { ...initialState, error: 'Oops' };
    const next = employeeReducer(state, clearError());
    expect(next.error).toBeNull();
  });

  // fetchEmployees
  it('fetchEmployees/pending — loading true', () => {
    const action = { type: fetchEmployees.pending.type };
    const next = employeeReducer(initialState, action);
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fetchEmployees/fulfilled — populates employees', () => {
    const action = { type: fetchEmployees.fulfilled.type, payload: [sampleEmployee] };
    const next = employeeReducer(initialState, action);
    expect(next.loading).toBe(false);
    expect(next.employees).toHaveLength(1);
    expect(next.employees[0]).toEqual(sampleEmployee);
  });

  it('fetchEmployees/rejected — sets error', () => {
    const action = { type: fetchEmployees.rejected.type, payload: 'Network error' };
    const next = employeeReducer(initialState, action);
    expect(next.loading).toBe(false);
    expect(next.error).toBe('Network error');
  });

  // createEmployee
  it('createEmployee/fulfilled — prepends to employees list', () => {
    const state = { ...initialState, employees: [{ ...sampleEmployee, id: '2' }] };
    const action = { type: createEmployee.fulfilled.type, payload: sampleEmployee };
    const next = employeeReducer(state, action);
    expect(next.employees[0]).toEqual(sampleEmployee);
    expect(next.employees).toHaveLength(2);
  });

  // updateEmployee
  it('updateEmployee/fulfilled — updates employee in list', () => {
    const updated = { ...sampleEmployee, name: 'Jane Smith' };
    const state = { ...initialState, employees: [sampleEmployee] };
    const action = { type: updateEmployee.fulfilled.type, payload: updated };
    const next = employeeReducer(state, action);
    expect(next.employees[0].name).toBe('Jane Smith');
  });

  // deleteEmployee
  it('deleteEmployee/fulfilled — removes employee from list', () => {
    const state = { ...initialState, employees: [sampleEmployee, { ...sampleEmployee, id: '2' }] };
    const action = { type: deleteEmployee.fulfilled.type, payload: '1' };
    const next = employeeReducer(state, action);
    expect(next.employees).toHaveLength(1);
    expect(next.employees[0].id).toBe('2');
  });

  it('fetchEmployeeById/pending — sets searchLoading', () => {
    const action = { type: fetchEmployeeById.pending.type };
    const next = employeeReducer(initialState, action);
    expect(next.searchLoading).toBe(true);
    expect(next.selectedEmployee).toBeNull();
  });

  it('fetchEmployeeById/fulfilled — sets selectedEmployee', () => {
    const action = { type: fetchEmployeeById.fulfilled.type, payload: sampleEmployee };
    const next = employeeReducer(initialState, action);
    expect(next.searchLoading).toBe(false);
    expect(next.selectedEmployee).toEqual(sampleEmployee);
  });
});
