import { CURRENCIES } from '../constants';

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress: string;
  currency: Currency;
  status: 'completed' | 'pending' | 'failed';
  date: string; // e.g. 2024-01-15T10:30:00Z
  description: string;
  clientId: string;
}

export interface PaymentSearchResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaymentQueryParams {
  search: string;
  currency: Currency;
  page: number;
  pageSize: number;
}

export interface TableState {
  search: string;
  currency: Currency;
  pageIndex: number;
  pageSize: number;
}

export type Currency = (typeof CURRENCIES)[number];
