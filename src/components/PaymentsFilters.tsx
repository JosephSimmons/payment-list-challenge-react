import { Form, Formik } from 'formik';
import { TableState } from '../types/payment';
import { I18N } from '../constants/i18n';
import { FilterRow, SearchButton } from './components';
import SearchInputField from './SearchInputField';

type PaymentsFiltersInitialValues = Pick<TableState, 'search' | 'currency'>;

type Props = {
  tableState: TableState;
  setTableState: React.Dispatch<React.SetStateAction<TableState>>;
};

const PaymentsFilters = ({ tableState, setTableState }: Props) => {
  return (
    <Formik<PaymentsFiltersInitialValues>
      initialValues={{
        search: tableState.search,
        currency: tableState.currency,
      }}
      onSubmit={(values) =>
        setTableState((prevTableState) => ({ ...prevTableState, ...values }))
      }
    >
      {({ isSubmitting }) => (
        <Form>
          <FilterRow>
            <SearchInputField
              name="search"
              placeholder={I18N.SEARCH_PLACEHOLDER}
              ariaLabel={I18N.SEARCH_LABEL}
            />
            <SearchButton type="submit" disabled={isSubmitting}>
              {I18N.SEARCH_BUTTON}
            </SearchButton>
          </FilterRow>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentsFilters;
