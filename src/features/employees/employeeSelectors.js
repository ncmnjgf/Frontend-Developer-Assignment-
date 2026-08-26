export const selectAllEmployees = (state) => state.employees.employees;
export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;
export const selectEmployeesLoading = (state) => state.employees.loading;
export const selectEmployeesError = (state) => state.employees.error;
export const selectSearchLoading = (state) => state.employees.searchLoading;
export const selectOperationLoading = (state) => state.employees.operationLoading;
