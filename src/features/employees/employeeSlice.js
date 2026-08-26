import { createSlice } from '@reduxjs/toolkit';
import {
  fetchEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './employeeThunks';

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  searchLoading: false,
  operationLoading: false,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch by ID
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.selectedEmployee = null;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(createEmployee.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.employees.unshift(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });

    // Update
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.operationLoading = false;
        const idx = state.employees.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.employees[idx] = action.payload;
        state.selectedEmployee = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.employees = state.employees.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedEmployee, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
