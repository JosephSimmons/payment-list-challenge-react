import { useState } from 'react';
import {
  Container,
  EmptyBox,
  Spinner,
  TableWrapper,
  Title,
} from './components';
import { I18N } from '../constants/i18n';
import { useQuery } from '@tanstack/react-query';
import { TableState } from '../types/payment';
import { fetchPaymentsData } from '../api/payments';
import PaymentsTable from './PaymentsTable';
import PaymentsFilters from './PaymentsFilters';
import PaymentsError from './PaymentsError';
import PaymentsPagination from './PaymentsPagination';

export const PaymentsPage = () => {
  const [tableState, setTableState] = useState<TableState>({
    search: '',
    currency: '',
    pageIndex: 0,
    pageSize: 5,
  });

  const setFilters = (filterValues: Partial<TableState>) =>
    setTableState((prev) => ({
      ...prev,
      ...filterValues,
      pageIndex: 0, // reset to first page on new search or filter change
    }));

  const clearFilters = () =>
    setTableState((prev) => ({
      ...prev,
      search: '',
      currency: '',
      pageIndex: 0, // reset to first page when clearing filters
    }));

  const incrementPage = () =>
    setTableState((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }));

  const decrementPage = () =>
    setTableState((prev) => ({
      ...prev,
      pageIndex: Math.max(0, prev.pageIndex - 1), // will only ever return 0 or a positive integer
    }));

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['payments', tableState],
    queryFn: () => fetchPaymentsData(tableState),
  });

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <PaymentsFilters
        search={tableState.search}
        currency={tableState.currency}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />

      {isPending ? (
        <EmptyBox>
          <Spinner />
        </EmptyBox>
      ) : isError ? (
        <PaymentsError error={error} />
      ) : data.payments.length === 0 ? (
        <EmptyBox>{I18N.NO_PAYMENTS_FOUND}</EmptyBox>
      ) : (
        <TableWrapper>
          <PaymentsTable listData={data.payments} />
          <PaymentsPagination
            pageNumber={data.page}
            isFirstPage={data.page === 1}
            isLastPage={data.page === Math.ceil(data.total / data.pageSize)}
            incrementPage={incrementPage}
            decrementPage={decrementPage}
          />
        </TableWrapper>
      )}
    </Container>
  );
};
