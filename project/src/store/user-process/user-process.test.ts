import { internet } from 'faker';
import { AuthorizationStatus } from '../../constants';
import { requireAuthorization, setUserName, userProcess } from './user-process';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ authorizationStatus: AuthorizationStatus.Unknown, userName: '' });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = { authorizationStatus: AuthorizationStatus.NoAuth, userName: '' };
    const userName = internet.email();

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({ authorizationStatus: AuthorizationStatus.Auth, userName: '' });

    expect(userProcess.reducer(state, setUserName(userName)))
      .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userName: userName });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = { authorizationStatus: AuthorizationStatus.NoAuth, userName: '' };
    const userName = internet.email();

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userName: '' });

    expect(userProcess.reducer(state, setUserName(userName)))
      .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userName: userName });
  });
});
