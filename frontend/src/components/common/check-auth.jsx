import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  
  // Not authed && in admin page => navigate to auth login
  if (
    !isAuthenticated &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Not authed && in account, checkout pages
   if (
    !isAuthenticated &&
    (
      location.pathname.includes("/account") ||
      location.pathname.includes("/checkout")
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
    if(user?.role === 'admin') return <Navigate to="/admin/dashboard"/>
    else return <Navigate to="/"/>
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
  // if(
  //   isAuthenticated && user?.role === 'admin' &&
  //   location.pathname.includes("/shop")
  // ){
  //   return <Navigate to="/admin/dashboard"/>
  // }


  return <>{children}</>
};
export default CheckAuth;
