import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/config"
import { useState } from "react"
import { Link } from "react-router-dom"

const initState = {
  userName: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initState)
  const onSubmit = (e) => {
    e.preventDefault()
    console.log ('SUBMITTING LOGIN....')
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
            to='/auth/register'
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
      />
    </div>
  )
}
export default Login