import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmployeeTable from '@/components/employees/EmployeeTable';

const mockEmployees = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Mumbai',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    mobile: '9876543211',
    country: 'USA',
    state: 'California',
    district: 'San Francisco',
  },
];

describe('EmployeeTable', () => {
  it('renders employees by name', () => {
    render(
      <BrowserRouter>
        <EmployeeTable employees={mockEmployees} onDelete={vi.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('renders email and country', () => {
    render(
      <BrowserRouter>
        <EmployeeTable employees={mockEmployees} onDelete={vi.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  it('renders empty state when employees list is empty', () => {
    render(
      <BrowserRouter>
        <EmployeeTable employees={[]} onDelete={vi.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByText(/No employees yet/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <BrowserRouter>
        <EmployeeTable employees={mockEmployees} onDelete={onDelete} />
      </BrowserRouter>
    );
    const deleteButtons = screen.getAllByLabelText(/Delete/i);
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('renders correct number of rows', () => {
    render(
      <BrowserRouter>
        <EmployeeTable employees={mockEmployees} onDelete={vi.fn()} />
      </BrowserRouter>
    );
    const rows = screen.getAllByRole('row');
    // 1 header + 2 data rows
    expect(rows).toHaveLength(3);
  });
});
