import { Host } from './host';

export type UserData = Host & {
  email: string,
  token: string,
};
