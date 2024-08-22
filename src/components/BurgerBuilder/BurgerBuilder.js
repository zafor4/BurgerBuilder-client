import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/ActionCreaters';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchesAble: state.purchesAble,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchesable: () => dispatch(updatePurchasable()),
    };
};

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
        onclickCheckout: false,
    };

    addIngredientHandle = (type, price) => {
        this.props.addIngredient(type);
        this.props.updatePurchesable();
    };

    removeIngredientHandle = (type, price) => {
        this.props.removeIngredient(type);
        this.props.updatePurchesable();
    };

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    };

    handleCheckout = () => {
        this.setState({ onclickCheckout: true });
    };

    render() {
        if (this.state.onclickCheckout) {
            return <Navigate to="/checkout" replace={true} />;
        }

        return (
            <div>
                <div className='d-flex flex-md-row flex-column'>
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchesAble={this.props.purchesAble}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: '#D70F64' }} onClick={this.handleCheckout}>
                            Continue To Checkout
                        </Button>
                        <Button color='secondary' onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
