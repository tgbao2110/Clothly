import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const CustomerHeaderAuthActions = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={"outline"}
        onClick={() => navigate('/auth/register')}
      >
        Register
      </Button>

      <Button
        onClick={() => navigate('/auth/login')}
      >
        Login
      </Button>
    </div>
  )
}
export default CustomerHeaderAuthActions