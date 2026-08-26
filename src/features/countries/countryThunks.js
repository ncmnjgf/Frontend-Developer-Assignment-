import { createAsyncThunk } from '@reduxjs/toolkit';
import countryService from '@/services/countryService';

export const fetchCountries = createAsyncThunk(
  'countries/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await countryService.getAll();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
