import { Form, Formik } from 'formik';
import { TableState } from '../types/payment';
import { I18N } from '../constants/i18n';
import { ClearButton, FilterRow, SearchButton } from './components';
import SearchInputField from './SearchInputField';
import SelectField, { SelectOption } from './SelectField';
import { CURRENCIES } from '../constants';

type PaymentsFiltersInitialValues = Pick<TableState, 'search' | 'currency'>;

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: '', label: I18N.CURRENCIES_OPTION }, // default empty option
  ...CURRENCIES.map((currency) => ({ value: currency, label: currency })),
];

type Props = {
  search: TableState['search'];
  currency: TableState['currency'];
  setFilters: (filterValues: Partial<TableState>) => void;
  clearFilters: () => void;
};

const PaymentsFilters = ({
  search,
  currency,
  setFilters,
  clearFilters,
}: Props) => {
  return (
    <Formik<PaymentsFiltersInitialValues>
      initialValues={{
        search,
        currency,
      }}
      onSubmit={(values, { setSubmitting }) => {
        setFilters(values);
        setSubmitting(false);
      }}
      enableReinitialize // this allows the form to update when tableState changes, which is important for the Clear button to work correctly
    >
      {({ values, isSubmitting }) => (
        <Form>
          <FilterRow>
            <SearchInputField
              name="search"
              placeholder={I18N.SEARCH_PLACEHOLDER}
              ariaLabel={I18N.SEARCH_LABEL}
            />

            <SelectField
              name="currency"
              ariaLabel={I18N.CURRENCY_FILTER_LABEL}
              options={CURRENCY_OPTIONS}
            />

            <SearchButton
              type="submit"
              disabled={
                isSubmitting ||
                (values.search === search && values.currency === currency)
              }
            >
              {I18N.SEARCH_BUTTON}
            </SearchButton>

            {search !== '' || currency !== '' ? (
              <ClearButton onClick={clearFilters}>
                {I18N.CLEAR_FILTERS}
              </ClearButton>
            ) : null}
          </FilterRow>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentsFilters;
