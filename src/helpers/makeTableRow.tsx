import { JSX } from 'react';
import { TableCell } from '../components/components';
import { Payment } from '../types/payment';
import { TableColumn } from '../types/table';

export const makeTableRow = (
  payment: Payment,
  columns: TableColumn[],
): JSX.Element[] =>
  columns.map((column) => {
    const value = payment[column.accessorKey];

    const renderedValue =
      typeof column.cellRenderer === 'function'
        ? column.cellRenderer(value)
        : value;

    return (
      <TableCell key={`${payment.id}-${column.accessorKey}`}>
        {renderedValue}
      </TableCell>
    );
  });
