import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const renderDialog = (props = {}) =>
  render(
    <BrowserRouter>
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        employeeName="John Doe"
        {...props}
      />
    </BrowserRouter>
  );

describe('ConfirmDialog', () => {
  it('renders employee name in message', () => {
    renderDialog();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  it('renders Cancel and Delete buttons', () => {
    renderDialog();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete Employee')).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn();
    renderDialog({ onClose });
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onConfirm when Delete is clicked', () => {
    const onConfirm = vi.fn();
    renderDialog({ onConfirm });
    fireEvent.click(screen.getByText('Delete Employee'));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('disables buttons when loading', () => {
    renderDialog({ loading: true });
    expect(screen.getByText('Cancel')).toBeDisabled();
    expect(screen.getByText('Deleting…')).toBeDisabled();
  });

  it('does not render when open=false', () => {
    render(
      <BrowserRouter>
        <ConfirmDialog open={false} onClose={vi.fn()} onConfirm={vi.fn()} employeeName="Jane" />
      </BrowserRouter>
    );
    expect(screen.queryByText('Delete Employee')).not.toBeInTheDocument();
  });
});
