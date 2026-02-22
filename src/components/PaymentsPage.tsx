import { useState } from 'react';
import { Container, Spinner, Title } from './components';
import { I18N } from '../constants/i18n';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TableState } from '../types/payment';
import { fetchPaymentsData } from '../api/payments';
import PaymentsTable from './PaymentsTable';
import PaymentsFilters from './PaymentsFilters';
import PaymentsError from './PaymentsError';

const PAYMENTS_QUERY_KEY = 'payments';

export const PaymentsPage = () => {
  const queryClient = useQueryClient();

  const [tableState, setTableState] = useState<TableState>({
    search: '',
    currency: '',
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: [PAYMENTS_QUERY_KEY, tableState],
    queryFn: () => fetchPaymentsData(tableState),
  });

  const handleSearch: React.Dispatch<React.SetStateAction<TableState>> = (
    newStateOrUpdater,
  ) => {
    setTableState(newStateOrUpdater);
    // Invalidate the payments query to allow refetching with the same parameters because the Search button remains clickable when value is unchanged
    queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <PaymentsFilters tableState={tableState} setTableState={handleSearch} />

      {isPending ? (
        <Spinner />
      ) : isError ? (
        <PaymentsError error={error} />
      ) : (
        <PaymentsTable listData={data.payments} />
      )}
    </Container>
  );
};
