import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const CustomerHeaderAuthActions = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={"outline"}
        onClick={() => navigate(`/auth/register?redirect=${currentPath}`)}
      >
        Register
      </Button>

      <Button
        onClick={() => navigate(`/auth/login?redirect=${currentPath}`)}
      >
        Login
      </Button>
    </div>
  )
}
export default CustomerHeaderAuthActions