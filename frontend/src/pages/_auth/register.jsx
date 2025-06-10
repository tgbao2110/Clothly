import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { registerUser } from "@/store/auth-slice"

const initState = {
  userName: '',
  email: '',
  password: ''
}

const Register = () => {

  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initState);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    .then((data) => {
      console.log(data?.payload?.message);
      if(data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate('/auth/login');
      };
    })
  }
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link 
            to='/auth/login'
            className="ml-1 text-primary font-medium hover:underline underline-offset-2"
          >
            Login
          </Link>
        </p>
        
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  )
}
export default Register