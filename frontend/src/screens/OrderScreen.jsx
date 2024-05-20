import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useMarkOrderAsDeliveredMutation } from '../slices/orderApiSlice';
import { addDecimals } from '../utils/cartUtils';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, error, isLoading, refetch } = useGetOrderDetailsQuery(orderId);
    //console.log(order);

    const [payOrder, { isLoading:loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading:loadingDeliverOrder }] = useMarkOrderAsDeliveredMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => { 
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({ 
                    type: 'resetOptions', 
                    value: { 'client-id': paypal.clientId, 
                    currency: 'USD',
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, errorPayPal, loadingPayPal]);

    function onApprove(data, actions) { 
        //console.log(data);
        //console.log(actions);
        return actions.order.capture().then(async function(details) {
            try { 
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment Successful');
            } catch (err) { 
                toast.error(err?.data?.message || err.message);
            }
        });
    };

    function onError(err) { 
        toast.error(err.message);
    };

    /* async function onApproveTest() { 
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success('Payment Successful');
    }; */

    function createOrder(data, actions) { 
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => { 
            return orderId;
        });
    };

    const deliverOrderHandler = async () => { 
        try { 
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Delivered');
        } catch (err) { 
            toast.error(err?.data?.message || err.message);
        }
    }

    return isLoading ? <Loader /> : error ? <Message variant='danger' /> : (
        <>
            <h2>Order Summary - {order._id}</h2>
            <Row>
                <Col sm={12} md={7} lg={8}>
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
                <Col sm={12} md={5} lg={4}>
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

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {isPending ? <Loader /> : ( 
                                        <div>
                                            {/* <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>
                                                Test Pay Order
                                            </Button> */}
                                            <div className='col-xs-12'>
                                                <PayPalButtons
                                                    createOrder={ createOrder }
                                                    onApprove={ onApprove }
                                                    onError={ onError }
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}
                        { loadingDeliverOrder && <Loader /> }   
                        { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && ( 
                            <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        
                        )} 
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen
