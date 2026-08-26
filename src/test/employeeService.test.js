import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '@/services/api';
import employeeService from '@/services/employeeService';

vi.mock('@/services/api');

const mockEmployee = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  mobile: '9876543210',
  country: 'India',
  state: 'Maharashtra',
  district: 'Mumbai',
};

describe('employeeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll — fetches employees list', async () => {
    api.get = vi.fn().mockResolvedValueOnce({ data: [mockEmployee] });
    const result = await employeeService.getAll();
    expect(api.get).toHaveBeenCalledWith('/employee');
    expect(result).toEqual([mockEmployee]);
  });

  it('getById — fetches single employee', async () => {
    api.get = vi.fn().mockResolvedValueOnce({ data: mockEmployee });
    const result = await employeeService.getById('1');
    expect(api.get).toHaveBeenCalledWith('/employee/1');
    expect(result).toEqual(mockEmployee);
  });

  it('create — posts new employee', async () => {
    api.post = vi.fn().mockResolvedValueOnce({ data: mockEmployee });
    const result = await employeeService.create(mockEmployee);
    expect(api.post).toHaveBeenCalledWith('/employee', mockEmployee);
    expect(result).toEqual(mockEmployee);
  });

  it('update — puts updated employee', async () => {
    const updated = { ...mockEmployee, name: 'Jane Smith' };
    api.put = vi.fn().mockResolvedValueOnce({ data: updated });
    const result = await employeeService.update('1', updated);
    expect(api.put).toHaveBeenCalledWith('/employee/1', updated);
    expect(result).toEqual(updated);
  });

  it('remove — deletes employee', async () => {
    api.delete = vi.fn().mockResolvedValueOnce({ data: {} });
    await employeeService.remove('1');
    expect(api.delete).toHaveBeenCalledWith('/employee/1');
  });

  it('getById — rejects on API error', async () => {
    api.get = vi.fn().mockRejectedValueOnce(new Error('Not Found'));
    await expect(employeeService.getById('999')).rejects.toThrow('Not Found');
  });
});
