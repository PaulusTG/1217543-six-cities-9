import { Navigate, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
