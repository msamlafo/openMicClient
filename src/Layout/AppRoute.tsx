import * as React from 'react';
import { Route } from 'react-router-dom';

export type AppRouteProps = {
  component: React.ComponentType<any>;
  layout: React.ComponentType<any>;
  path: string;
  exact?:boolean;
};

const AppRoute: React.FC<AppRouteProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default AppRoute;
