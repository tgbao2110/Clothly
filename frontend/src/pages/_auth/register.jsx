import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { useState } from "react"
import { Link } from "react-router-dom"

const initState = {
  userName: '',
  email: '',
  password: ''
}

const Register = () => {
  const [formData, setFormData] = useState(initState)
  const onSubmit = (e) => {
    e.preventDefault()
    console.log ('SUBMITTING REGISTRATION....')
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