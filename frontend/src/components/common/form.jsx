import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText}) => {

    const rederInputsByComponentType = (control) => {
        const value = formData[control.name];

        switch (control.componentType) {
            
            //// INPUT ////
            case 'input':
                return <Input 
                    id = {control.name}
                    name = {control.name}
                    placeholder = {control.placeholder}
                    type = {control.type}
                    value = {value}
                    onChange = {e => setFormData({
                        ...formData,
                        [control.name]: e.target.value
                    })}
                />
            
            //// SELECT //// 
            case 'select':
                return (
                    <Select 
                        value={value}
                        onValueChange = {value => setFormData({
                            ...formData,
                            [control.name] : value
                        })}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={control.placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                control &&
                                control.length > 0 &&
                                control.options.map(option => {
                                    <SelectItem value = {option.id}>
                                        {option.label}
                                    </SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>
                )

            //// TEXTAREA //// 
            case 'textarea':
                return <Textarea
                    id = {control.id}
                    name = {control.name}
                    placeholder = {control.placeholder}
                    type = {control.type}
                    value={value}
                    onChange = {e => setFormData({
                        ...formData,
                        [control.name]: e.target.value
                    })}
                />
            
            default:
                return  <></>
        }
    }

  return (
    <form onSubmit={onSubmit}>
        {/* ==== Form Content ==== */}
        <div className="flex flex-col gap-3">
            {
                formControls.map(control => 
                    <div className="grid w-full gap-1.5" key={control.name}>
                        <Label className="mb-1">
                            {control.label}
                        </Label>
                        {
                            rederInputsByComponentType(control)
                        }
                    </div>
                )
            }
        </div>
        
        {/* ===== Button ===== */}
        <Button type='submit' className="mt-1">
            {buttonText || 'Submit'}
        </Button>
    </form>
  )
}
export default CommonForm