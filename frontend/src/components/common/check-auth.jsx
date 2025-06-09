import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  //
  // Not authed && not in auth pages => navigate to auth login
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //
  //Authed && in auth pages => navigate to home
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if(user?.role === 'admin') return <Navigate to="admin/dashboard"/>
    else return <Navigate to="/customer"/>
  }

  //
  // Not admin && in admin pages => navigate to access-denied
  if(
    isAuthenticated && user?.role !== 'admin' &&
    location.pathname.includes("/admin")
  ){
    return <Navigate to="/access-denied"/>
  }

  //
  // Admin && in customer pages => navigate to admin
  if(
    isAuthenticated && user?.role === 'admin' &&
    location.pathname.includes("/shop")
  ){
    return <Navigate to="/admin/dashboard"/>
  }


  return <>{children}</>
};
export default CheckAuth;
