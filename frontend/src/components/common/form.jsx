import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText}) => {

    const handleInputChange = (e, control) => {
        let newValue = e.target.value;
      if (control.type === "number") {
        if (newValue > control.max)
            newValue = control.max
        if (newValue < control.min)
            return
        if (control.isInteger && e.target.value % 1 !== 0)
            newValue= Math.floor(e.target.value)
      } 
        setFormData({
            ...formData,
            [control.name]: newValue,
        });
    };

    const isFormFilled = () => {
      return Object.values(formData)
        .map((v) => v !== "")
        .every((v) => v);
    };

    const rederInputsByComponentType = (control) => {
        const value = formData[control.name];

        switch (control.componentType) {
            
            //// INPUT ////
            case 'input':
                return (
                  <Input
                    id={control.name}
                    name={control.name}
                    placeholder={control.placeholder}
                    type={control.type}
                    value={value}
                    min={control.min}
                    max={control.max}
                    step={control.isInteger ? 1 : 0.1}
                    onChange={(e) => handleInputChange(e, control)}
                  />
                );
            
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
                                control.options.length > 0 &&
                                control.options.map(option => (
                                    <SelectItem key = {option.id} value ={option.id}>
                                        {option.label}
                                    </SelectItem>
                                ))
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
        <Button disabled={!isFormFilled()} type='submit' className="mt-5" >
            {buttonText || 'Submit'}
        </Button>
    </form>
  )
}
export default CommonForm