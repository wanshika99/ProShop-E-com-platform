import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';


const OrderListScreen = () => {
  const { data:orders, isLoading, error } = useGetOrdersQuery();
  //console.log(orders);

  return (
    <>
    <h2>Orders List</h2>
    { isLoading ? <Loader /> : error ? 
    <Message variant='danger'>{error}</Message> : (
      <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                    <FaTimes style={{ color: 'red' }} />
                )}
                </td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                    <FaTimes style={{ color: 'red' }} />
                )}
                </td>
                <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                        <Button className='btn-sm' variant='light'>Details</Button>
                    </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    )}
    </>
  )
}

export default OrderListScreen
