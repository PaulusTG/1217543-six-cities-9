import { AuthorizationStatus, NameSpace } from '../../constants';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserName = (state: State): string => state[NameSpace.User].userName;
