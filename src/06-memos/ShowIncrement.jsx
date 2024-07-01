import React from "react";

export const ShowIncrement = React.memo( ({ increment }) => {

  console.log('Me he vuelto a generar')

  return (
    <button
      className="btn btn-success shadow-sm"
      onClick={ () => {
        increment( 5 );
      }}
    >
      Incrementar  
    </button>
  )
})
