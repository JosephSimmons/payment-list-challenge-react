import axios from 'axios';
import {
  PaymentQueryParams,
  PaymentSearchResponse,
  TableState,
} from '../types/payment';
import { API_URL } from '../constants';

export const fetchPaymentsData = async (tableState: TableState) => {
  const { search, currency, pageIndex, pageSize } = tableState;

  const params: PaymentQueryParams = {
    search,
    currency,
    page: pageIndex + 1,
    pageSize,
  };

  const start = performance.now();

  try {
    // PaymentsError component will handle error display from Axios response so its use here is important
    const response = await axios.get<PaymentSearchResponse>(API_URL, {
      params,
    });

    const duration = performance.now() - start;

    console.log('[API] fetchPaymentsData', {
      url: API_URL,
      params,
      status: response.status,
      duration,
    });

    return response.data;
  } catch (error) {
    const duration = performance.now() - start;

    console.error('[API] fetchPaymentsData error', {
      url: API_URL,
      params,
      error,
      duration,
    });

    throw error;
  }
};
