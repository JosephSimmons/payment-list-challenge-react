import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import axios from 'axios';
import { fetchPaymentsData } from './payments';
import { PaymentSearchResponse, TableState } from '../types/payment';

vi.mock('axios');

const mockTableState: TableState = {
  search: '',
  currency: '',
  pageIndex: 0,
  pageSize: 5,
};

const mockResponse: PaymentSearchResponse = {
  payments: [],
  total: 0,
  page: 1,
  pageSize: 5,
};

describe('fetchPaymentsData', () => {
  test('returns data on success', async () => {
    const getSpy = vi.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: mockResponse,
    });
    const result = await fetchPaymentsData(mockTableState);
    expect(result).toEqual(mockResponse);
    getSpy.mockRestore();
  });

  test('throws on error', async () => {
    const getSpy = vi
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('API error'));
    await expect(fetchPaymentsData(mockTableState)).rejects.toThrow(
      'API error',
    );
    getSpy.mockRestore();
  });
});
