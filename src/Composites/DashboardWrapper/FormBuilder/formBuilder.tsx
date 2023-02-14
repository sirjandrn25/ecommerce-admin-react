import React from 'react'

interface ValidationInterface {
    minLength?:number
    maxLength?:number
    isRequired?:number
    pattern?:string

}

interface SchemaInterface {
    name:string
    label?:string | any
    type?:string
    isRequired?:string
    validation?:ValidationInterface
    
}

interface FormInterface {
    fields:SchemaInterface[]
    onSubmit?:(data?:any)=>void
}

const FormBuilder = ({fields,onSubmit}:FormInterface) => {
    const schemaValidation = ()=>{

    }

  return (
    <div>FormBuilder</div>
  )
}

export default FormBuilder