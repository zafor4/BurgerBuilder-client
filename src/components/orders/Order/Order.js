import React from 'react'

const Order = (props) => {
    const ingredientSummary=props.order.ingredients.map(item=>{
        return(
            <span style={{
                border:'1px solid gray',
                borderRadius:"5px",
                padding :'5px',
                marginRight:'10px'
            }} key={item.type}>{item.amount} X <span style={{
                textTransform:"capitalize"
            }}>{item.type} </span></span>
        )
    })
  return (
    <div style={{
        border:'1px solid gray',
        boxShadow:'1px 1px #888888',
        borderRadius:"5px",
        padding :'20px',
        marginBottom:'10px'
    }}>
        <p>Order Number: {props.order.id}</p>
        <hr/>
        {ingredientSummary}
        <hr/>
        <p>Total: {props.order.price}</p>

    </div>
  )
}

export default Order