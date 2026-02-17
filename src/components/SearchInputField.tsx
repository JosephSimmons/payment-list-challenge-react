import { useField } from 'formik';
import { SearchInput } from './components';

type Props = {
  name: string;
  placeholder: string;
  ariaLabel: string;
};

const SearchInputField = ({ name, placeholder, ariaLabel }: Props) => {
  const [field] = useField(name);

  return (
    <SearchInput {...field} placeholder={placeholder} aria-label={ariaLabel} />
  );
};

export default SearchInputField;
