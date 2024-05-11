import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Form, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice';
import { addDecimals } from '../utils/cartUtils';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, error, isLoading, refetch } = useGetOrderDetailsQuery(orderId);
    //console.log(order);

    return isLoading ? <Loader /> : error ? <Message variant='danger' /> : (
        <>
            <h2>Order Summary - {order._id}</h2>
            <Row>
                <Col md={8}>
                    <Card className='my-2'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>User Details</h3>
                                <Row className='my-1'>
                                    <Col md={4}>
                                        <strong>Name:</strong>
                                    </Col>
                                    <Col md={8}>
                                    {order.user.name}
                                    </Col>
                                </Row>
                                <Row className='my-1'>
                                    <Col md={4}>
                                        <strong>Email:</strong>
                                    </Col>
                                    <Col md={8}>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <h3>Shipping Details</h3>
                                <Row className='my-1'>
                                    <Col md={4}>
                                        <strong>Address:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {order.shippingAddress.address}
                                    </Col>
                                </Row>
                                <Row className='my-1'>
                                    <Col md={4}>
                                        <strong>City:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {order.shippingAddress.city}
                                    </Col>
                                </Row>
                                <Row className='my-1'>
                                    <Col md={4}>
                                        <strong>Postal Code:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {order.shippingAddress.postalCode}
                                    </Col>
                                </Row>
                                <Row className='my-1'>
                                    <Col md={4}>
                                        <strong>Country:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {order.shippingAddress.country}
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    {order.isDelivered ? <Message variant='success'>Delivered on 
                                    {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className='my-1'>
                                    <h3>Payment Method</h3>
                                    <Col md={4}>
                                        <strong>Method:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {order.paymentMethod}
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Order Items</h3>
                                <Table responsive="md" hover>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Item Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '100px', height: 'auto' }}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                                </td>
                                                <td>
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </td>
                                                <td>
                                                {item.qty}
                                                </td>
                                                <td style={{textAlign:"right", paddingRight: '3%'}}>
                                                $ {item.price}
                                                </td>
                                                <td style={{textAlign:"right", paddingRight: '3%'}}>
                                                $ {addDecimals(item.qty * item.price)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={4}>
                <Card className='my-2'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items Price</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(order.itemsPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(order.shippingPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Calculated Tax</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(order.taxPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(order.totalPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen
