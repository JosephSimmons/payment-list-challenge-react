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
      onSubmit={(values, { setSubmitting }) => {
        setTableState((prev) => ({
          ...prev,
          ...values,
          pageIndex: 0, // reset to first page on new search or filter change
        }));
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
                (values.search === tableState.search &&
                  values.currency === tableState.currency)
              }
            >
              {I18N.SEARCH_BUTTON}
            </SearchButton>

            {tableState.search !== '' || tableState.currency !== '' ? (
              <ClearButton
                onClick={() =>
                  setTableState((prev) => ({
                    ...prev,
                    search: '',
                    currency: '',
                    pageIndex: 0, // reset to first page when clearing filters
                  }))
                }
              >
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
