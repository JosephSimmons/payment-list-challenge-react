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

  const response = await axios.get<PaymentSearchResponse>(API_URL, { params });
  // PaymentsError component will handle error display from Axios response so its use here is important

  return response.data;
};
