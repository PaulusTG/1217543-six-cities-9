import request from 'axios';
import { toast } from 'react-toastify';
import { HTTPCode } from '../constants';
import { ErrorType } from '../types/error';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTPCode.BAD_REQUEST:
        toast.info(response.data.error);
        break;
      case HTTPCode.UNAUTHORIZED:
        toast.info(response.data.error);
        break;
      case HTTPCode.NOT_FOUND:
        toast.info(response.data.error);
        break;
    }
  }
};
