import { JSX } from 'react';
import { I18N } from '../constants/i18n';
import { formattedDate } from '../helpers/formatDates';
import { Payment } from '../types/payment';
import { TableColumn } from '../types/table';
import {
  StatusBadge,
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from './components';

const COLUMNS: TableColumn[] = [
  { header: I18N.TABLE_HEADER_PAYMENT_ID, accessorKey: 'id' },
  {
    header: I18N.TABLE_HEADER_DATE,
    accessorKey: 'date',
    cellRenderer: (value) => formattedDate(value as Payment['date']),
  },
  {
    header: I18N.TABLE_HEADER_AMOUNT,
    accessorKey: 'amount',
    cellRenderer: (value) => (value as Payment['amount']).toFixed(2),
  },
  {
    header: I18N.TABLE_HEADER_CUSTOMER,
    accessorKey: 'customerName',
    fallbackValue: I18N.EMPTY_CUSTOMER,
  },
  {
    header: I18N.TABLE_HEADER_CURRENCY,
    accessorKey: 'currency',
    fallbackValue: I18N.EMPTY_CURRENCY,
  },
  {
    header: I18N.TABLE_HEADER_STATUS,
    accessorKey: 'status',
    cellRenderer: (value) => (
      <StatusBadge status={value as Payment['status']}>{value}</StatusBadge>
    ),
  },
];

const makeTableRow = (
  payment: Payment,
  columns: TableColumn[],
): JSX.Element[] =>
  columns.map((column) => {
    const value = payment[column.accessorKey];

    const valueWithFallback =
      value == null || value === '' ? column.fallbackValue || '' : value;

    const renderedValue =
      typeof column.cellRenderer === 'function'
        ? column.cellRenderer(valueWithFallback)
        : valueWithFallback;

    return (
      <TableCell key={`${payment.id}-${column.accessorKey}`}>
        {renderedValue}
      </TableCell>
    );
  });

type Props = { payments: Payment[] };

const PaymentsTable = ({ payments }: Props) => {
  return (
    <Table>
      <TableHeaderWrapper>
        <TableHeaderRow>
          {COLUMNS.map((column) => (
            <TableHeader key={`th-${column.accessorKey}`} scope="col">
              {column.header}
            </TableHeader>
          ))}
        </TableHeaderRow>
      </TableHeaderWrapper>

      <TableBodyWrapper>
        {payments.map((row) => (
          <TableRow key={row.id}>{makeTableRow(row, COLUMNS)}</TableRow>
        ))}
      </TableBodyWrapper>
    </Table>
  );
};

export default PaymentsTable;
