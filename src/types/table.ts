import { Payment } from './payment';

export type TableColumn = {
  header: string;
  accessorKey: keyof Payment;
  cellRenderer?: (value: Payment[keyof Payment]) => React.ReactNode;
};
