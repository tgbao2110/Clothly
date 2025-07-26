import { ChevronLeft } from "lucide-react";

const AccessDenied = () => {
  return (
    <div className="flex flex-1 items-center justify-center h-full px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold text-destructive mb-2">Access Denied</h1>
        
        <p className="text-muted-foreground mb-4">
          You don’t have permission to view this page.
        </p>

        <a href="/" className="text-primary 
          flex flex-row justify-center items-center
          hover:underline underline-offset-2"
        >
          <ChevronLeft/> <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
};

export default AccessDenied