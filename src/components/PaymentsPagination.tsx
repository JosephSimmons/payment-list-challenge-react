import { PaginationButton, PaginationRow } from './components';
import { I18N } from '../constants/i18n';

type Props = {
  pageNumber: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  incrementPage: () => void;
  decrementPage: () => void;
};

const PaymentsPagination = ({
  pageNumber,
  isFirstPage,
  isLastPage,
  incrementPage,
  decrementPage,
}: Props) => {
  return (
    <PaginationRow>
      <PaginationButton disabled={isFirstPage} onClick={decrementPage}>
        {I18N.PREVIOUS_BUTTON}
      </PaginationButton>

      <span>{`${I18N.PAGE_LABEL} ${pageNumber}`}</span>

      <PaginationButton disabled={isLastPage} onClick={incrementPage}>
        {I18N.NEXT_BUTTON}
      </PaginationButton>
    </PaginationRow>
  );
};

export default PaymentsPagination;
