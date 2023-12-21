import { HttpStatus } from '@nestjs/common';

export type SuccessResponseType<T> = {
  statusCode: HttpStatus;
  message: string;
  result: T;
  resultInfo?: {
    perPage: number;
    page: number;
  };
};

export type PaginatedSuccessResponseType<T> = SuccessResponseType<T> & {
  resultInfo?: {
    perPage: number;
    page: number;
  };
};

export type UserRequestType = {
  email: string;
  name: string;
  id: string;
};

//Inorder to use custom request data i.e @ExtractKeyFromRequest
declare module 'express' {
  export interface Request {
    user: UserRequestType;
  }
}

export type PaloadType = { userIs: string; email: string };
