import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { connect, useDispatch, useSelector } from "react-redux";
import { resetIngredients } from "../../../redux/ActionCreaters";
import { baseUrl } from "../../../utils/config";
import { redirect } from "react-router-dom";


const mapStateToProps=state=>{
    return {
        token :state.token,
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchesAble:state.purchesAble

    }

}

const mapDispatchToProps=dispatch=>{
    return {
        resetIngredients:()=>dispatch(resetIngredients())
    }
}
const Checkout = (props) => {
    const [values, setValues] = useState({
        deliveryAdress: "",
        
        paymentType: "Cash On Delivery",
        phone: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
const navigate=useNavigate()

    const inputChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();  // Prevent form submission from reloading the page
    
        let apiUrl = "";
        if (values.paymentType === 'Cash On Delivery') {
            apiUrl = `${baseUrl}/order`;
        } else if (values.paymentType === 'Pay Now') {
            apiUrl = `${baseUrl}/payment`;
        }
    
    
        if (!apiUrl) {
            setModalMsg("Please select a payment method.");
            setIsModalOpen(true);
            return;
        }
    
        setIsLoading(true);
    
        const order = {
            ingredients: props.ingredients,
            customer: values,
            price: props.totalPrice,
        };
    
    
        // Uncomment this to make the actual API request
        axios.post(apiUrl, order, {
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        })
        .then(response => {
            setIsLoading(false);
            if (response.status === 201) {
                setModalMsg("Order Placed Successfully");
                setIsModalOpen(true);
                props.resetIngredients();
                setTimeout(()=>{
                    setIsModalOpen(false)
                    if (values.paymentType==='Pay Now'){
                        window.location.href = response.data.GatewayPageURL; 
                      }
                      else {
                        navigate('/',{replace:true})
                      }
                },1000)

            } else {
                setModalMsg("Something went wrong. Please try again.");
                setIsModalOpen(true);
            }
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false);
            setModalMsg("Something went wrong. Please try again.");
            setIsModalOpen(true);
        });
    };
    



    return (
        <div>
            {isLoading ? <Spinner /> : (
                <div>
                    <h4>Payment: {props.totalPrice} BDT</h4>
                    <form onSubmit={submitHandler} style={{
                        border: "1px solid gray",
                        boxShadow: "1px 1px #888888",
                        borderRadius: '5px',
                        padding: '20px'
                    }}>
                        <textarea
                            name="deliveryAdress"
                            value={values.deliveryAdress}
                            className="form-control"
                            placeholder="Your delivery address"
                            onChange={inputChangeHandler}
                        ></textarea>
                        <br />
                        <input
                            name="phone"
                            value={values.phone}
                            className="form-control"
                            placeholder="Your phone number"
                            onChange={inputChangeHandler}
                        />
                        <br />
                        <select
                            name="paymentType"
                            value={values.paymentType}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Pay Now">Pay Now</option>
                        </select>
                        <br />
                        <Button
                            style={{ backgroundColor: "#D70F64", marginRight: "5px" }}
                            type="submit"
                            disabled={!props.purchesAble}
                        >
                            Place Order
                        </Button>
                        <Button
                            color="secondary"
                            
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            )}
            <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
                <ModalBody>
                    <p>{modalMsg}</p>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)
