import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/config"
import { loginUser } from "@/store/auth-slice"
import { getCartItems } from "@/store/customer-slices/cart-slice"
import { getAllAddresses } from "@/store/customer-slices/address-slice"

const Login = () => {
  const initState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initState);
  
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    //
    // Dispatch login thunk
    dispatch(loginUser(formData))
    .then((action) => {
      //
      // Handle success
      if(action?.payload?.success) {
        toast.success(action?.payload?.message);
        dispatch(getCartItems(action?.payload?.user.id))
        dispatch(getAllAddresses(action?.payload?.user.id))

        if(action?.payload?.user.role === 'admin')
          navigate('/admin/');
        else navigate(redirectPath);
      }
      //
      // Handle server error
      else {
        toast.error(action?.payload?.message || 'Unexpected error');
      };
    })
  }
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Welcome back
        </h1>
        <p className="mt-2">
          Haven't had an account yet?
          <Link 
            to={`/auth/register?redirect=${redirectPath}`}
            className="ml-1 text-primary font-medium hover:underline underline-offset-2"
          >
            Register
          </Link>
        </p>
        
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Login"}
        hasCancel={true}
        cancelText={"Back"}
        onCancel={() => navigate(redirectPath)}
      />
    </div>
  )
}
export default Login