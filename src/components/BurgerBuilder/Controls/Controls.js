import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";


const mapStateToProps=state=>{
  return{
    token:state.token
  }
}

const controls = [
  { label: "Salad", type: "salad" ,price:30 },
  { label: "Cheese", type: "cheese",price:50 },
  { label: "Meat", type: "meat", price:90 },
];

const BuildControl = (props) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="mt-.5" style={{fontWeight:'bold',fontSize:'1.2rem'}}>{props.label}</div>
      <div>
        <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
        <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
      </div>
    </div>
  );
};

const Controls = (props) => {
  return (
    <div className="container ml-md-5" style={{ textAlign: "center" }}>
      <Card
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <CardHeader
          style={{
            backgroundColor: "#D70F64",
            color: "white",
          }}
        >
          <h4>Add Ingredient</h4>
        </CardHeader>
        <CardBody>
          {controls.map((item) => {
            return (
              <BuildControl
                label={item.label}
                type={item.type}
                key={Math.random()}
                added={()=>{props.ingredientAdded(item.type,item.price)}}
                removed={()=>{props.ingredientRemoved(item.type,item.price)}}
              />
            );
          })}
        </CardBody>
        <CardFooter>
          <h5>Price: <strong>{props.price}</strong> BDT</h5>
        </CardFooter>
        <Button style={{
          backgroundColor:'#D70F64'
        }} disabled={!props.purchesAble||!props.token} onClick={props.toggleModal}>Order Now</Button>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps)(Controls)
