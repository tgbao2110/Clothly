import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";

const NotFound = () => {

    const user = useSelector(state=>state.auth.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 gap-1">
      <h1 className="text-7xl font-bold text-destructive mb-2">404</h1>
      <h2 className="text-4xl font-bold text-destructive mb-2">Not Found</h2>
      <p className="text-muted-foreground mb-4">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      
      <a href={ (user && user?.role === 'admin') 
        ? '/admin' : '/'
      } className="text-primary 
          flex flex-row justify-center items-center
          hover:underline underline-offset-2"
      >
          <ChevronLeft/> <span>Back to Home</span>
        </a>
    </div>
  );
};

export default NotFound;