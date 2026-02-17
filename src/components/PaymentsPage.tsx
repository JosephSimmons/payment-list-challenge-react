import { useState } from 'react';
import { Container, ErrorBox, Spinner, Title } from './components';
import { I18N } from '../constants/i18n';
import { useQuery } from '@tanstack/react-query';
import { TableState } from '../types/payment';
import { fetchPaymentsData } from '../api/payments';
import PaymentsTable from './PaymentsTable';
import PaymentsFilters from './PaymentsFilters';

export const PaymentsPage = () => {
  const [tableState, setTableState] = useState<TableState>({
    search: '',
    currency: '',
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isPending, error } = useQuery({
    queryKey: ['payments', tableState],
    queryFn: () => fetchPaymentsData(tableState),
  });

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <PaymentsFilters tableState={tableState} setTableState={setTableState} />
      {isPending ? (
        <Spinner />
      ) : error ? (
        <ErrorBox>{I18N.SOMETHING_WENT_WRONG}</ErrorBox>
      ) : (
        <PaymentsTable listData={data.payments} />
      )}
    </Container>
  );
};
