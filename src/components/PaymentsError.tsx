import { ErrorBox } from './components';
import { I18N } from '../constants/i18n';
import { isAxiosError } from 'axios';

type Props = {
  error: Error;
};

const PaymentsError = ({ error }: Props) => {
  let errorMessage: string = I18N.SOMETHING_WENT_WRONG;

  // Axios used to make network request in fetchPaymentsData
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 404) {
      errorMessage = I18N.PAYMENT_NOT_FOUND;
    } else if (status === 500) {
      errorMessage = I18N.INTERNAL_SERVER_ERROR;
    }
  }

  return <ErrorBox>{errorMessage}</ErrorBox>;
};

export default PaymentsError;
