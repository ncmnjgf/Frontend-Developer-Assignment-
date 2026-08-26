import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmployeeForm from '@/components/employees/EmployeeForm';

const countries = [
  { id: '1', name: 'India' },
  { id: '2', name: 'USA' },
];

const renderForm = (props = {}) =>
  render(
    <BrowserRouter>
      <EmployeeForm countries={countries} onSubmit={vi.fn()} {...props} />
    </BrowserRouter>
  );

describe('EmployeeForm', () => {
  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/District/i)).toBeInTheDocument();
  });

  it('shows error for empty name on Submit', async () => {
    renderForm();
    fireEvent.click(screen.getByText(/Add Employee/i));
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid email', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByText(/Add Employee/i));
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('shows error for mobile with < 10 digits', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByText(/Add Employee/i));
    await waitFor(() => {
      expect(screen.getByText(/10 digits/i)).toBeInTheDocument();
    });
  });

  it('shows Update Employee button in edit mode', () => {
    renderForm({
      isEdit: true,
      defaultValues: {
        name: 'Jane',
        email: 'jane@example.com',
        mobile: '9876543210',
        country: 'India',
        state: 'MH',
        district: 'Mumbai',
      },
    });
    expect(screen.getByText(/Update Employee/i)).toBeInTheDocument();
  });
});
