import { createAsyncThunk } from '@reduxjs/toolkit';
import employeeService from '@/services/employeeService';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getAll();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await employeeService.getById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (data, { rejectWithValue }) => {
    try {
      return await employeeService.create(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await employeeService.update(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id, { rejectWithValue }) => {
    try {
      await employeeService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
