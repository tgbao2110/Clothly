export const createAddressForm = [
  {
    label: 'Phone number*',
    name: 'phone',
    componentType: 'input',
    type: 'text',
    placeholder: 'e.g. 0362...',
    pattern:"\\d*",
    inputmode:"numeric"
  },
  {
    label:'City*',
    name: 'city',
    componentType: 'input',
    type: 'text',
    placeholder: 'e.g. Ho Chi Minh, Ha Noi, Da Nang'
  },
  {
    label:'Address*',
    name: 'address',
    componentType: 'input',
    type: 'text',
    placeholder: 'e.g. 123 Nguyen Van Cu, District 5'
  },
  {
    label: 'ZIP code*',
    name: 'zipCode',
    componentType: 'input',
    type: 'text',
    placeholder: 'e.g. 700000.'
  },
  {
    label: 'Notes (optional)',
    name: 'notes',
    componentType: 'textarea',
    placeholder: 'Instructions to help ensure smooth delivery',
    optional: true
  },
]