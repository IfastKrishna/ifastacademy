import React from 'react';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';

const HideComponent = ({ roles = [], children }) => {
  const { data: userData } = useIsAuth() || {};
  const user = userData?.data;
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    const hasRole = roles.includes(user?.role);
    setHide(!hasRole);
  }, [user, roles]);

  return hide ? null : <>{children}</>;
};

export default HideComponent;
