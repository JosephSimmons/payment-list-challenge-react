import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import PaymentsTable from './PaymentsTable';
import { Payment } from '../types/payment';

const mockPayments: Payment[] = [
  {
    id: 'pay_1',
    customerName: 'John Doe',
    amount: 100,
    customerAddress: '123 Main St',
    currency: 'USD',
    status: 'completed',
    date: '2024-01-15T10:30:00Z',
    description: 'Test payment',
    clientId: 'client_1',
  },
];

describe('PaymentsTable accessibility', () => {
  test('table has accessible headers and rows', () => {
    render(<PaymentsTable payments={mockPayments} />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
    expect(screen.getAllByRole('columnheader').length).toBeGreaterThan(0);
  });
});
