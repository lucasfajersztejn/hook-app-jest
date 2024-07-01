import { memo } from "react";


export const Small = memo(({ value }) => {

  console.log('Se monto el componente')

  return (
    <small>{ value }</small>
  )
})
