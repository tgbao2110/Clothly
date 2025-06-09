import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { useState } from "react"

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
    <div>
      <h1>Register</h1>
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