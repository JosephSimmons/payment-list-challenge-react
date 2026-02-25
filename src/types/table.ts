export type TableColumn<T> = {
  header: string;
  accessorKey: keyof T;
  cellRenderer?: (value: T[keyof T]) => React.ReactNode;
  fallbackValue?: string;
};
