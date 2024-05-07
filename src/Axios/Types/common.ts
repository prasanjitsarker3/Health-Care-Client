import { number } from "zod";

export type IMetaData = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  data?: any;
  meta?: IMetaData;
};

export type IGenericErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessage: IGenericError;
};

export type IGenericError = {
  path: string | number;
  message: string;
};
