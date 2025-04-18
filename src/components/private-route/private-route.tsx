import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  condition: boolean;
  children: JSX.Element;
  navigateUrl: string;
}

function PrivateRoute({ condition, children, navigateUrl}: PrivateRouteProps): JSX.Element {

  return (
    condition ? children : <Navigate to={navigateUrl} />
  );
}

export { PrivateRoute};
