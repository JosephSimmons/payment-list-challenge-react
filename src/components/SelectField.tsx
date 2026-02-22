import { useField } from 'formik';
import { Select } from './components';

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  ariaLabel: string;
  options: SelectOption[];
};

const SelectField = ({ name, ariaLabel, options }: Props) => {
  const [field] = useField(name);

  return (
    <Select {...field} aria-label={ariaLabel}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectField;
