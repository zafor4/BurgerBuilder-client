import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../../redux/ActionCreaters'
import Order from './Order/Order'
import { Spinner } from 'reactstrap'

const mapStateToProps = state => {
  return {
      orders: state.orders,
      orderLoading: state.orderLoading,
      orderErr: state.orderErr,
      token: state.token,
      userId: state.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchOrders: (token) => dispatch(fetchOrders(token)),
  }
}

export class Orders extends Component {


  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }
  
  render() {
    let orders=this.props.orders.map(order=>{
      return <Order order={order} key={order.id}/>
    })

    return (
      <div>
        {this.props.orderLoading ?<Spinner/>:orders}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders)