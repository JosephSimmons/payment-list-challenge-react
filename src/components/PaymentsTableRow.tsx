import { TableCell } from './components';
import { Payment } from '../types/payment';
import { TableColumn } from '../types/table';

type Props = { payment: Payment; columns: TableColumn<Payment>[] };

const PaymentsTableRow = ({ payment, columns }: Props) => {
  return columns.map((column) => {
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
};

export default PaymentsTableRow;
