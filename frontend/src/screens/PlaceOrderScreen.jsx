import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, ListGroup, Image, Card, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { addDecimals } from '../utils/cartUtils';
import Message from '../components/Message';


const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => { 
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }else if(!cart.paymentMethod){
            navigate('/payment');
        }
    },[cart.shippingAddress.address, cart.paymentMethod, navigate]);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    
    const placeOrderHandler = async () => { 
        try {
            const res = await createOrder({ 
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`)
        } catch (err) {
            toast.error('Something went wrong, please try again', err);
        }
    };

    return (
        <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col sm={12} md={7} lg={8}>
                <ListGroup variant='flush'>
                    <Card className='my-2'>
                        <ListGroup.Item>
                            <h3>Shipping Details</h3>
                                <Row>
                                    <Col md={4}>
                                        <strong>Address:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {cart.shippingAddress.address}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <strong>City:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {cart.shippingAddress.city}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <strong>Postal Code:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {cart.shippingAddress.postalCode}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <strong>Country:</strong>
                                    </Col>
                                    <Col md={8}>
                                        {cart.shippingAddress.country}
                                    </Col>
                                </Row>
                        </ListGroup.Item>
                    </Card>
                    <Card className='my-2'>
                        <ListGroup.Item>
                        <h3>Payment Method</h3>
                            <Row>
                                <Col md={4}>
                                    <strong>Method:</strong>
                                </Col>
                                <Col md={8}>
                                    {cart.paymentMethod}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Card>
                    <Card className='my-2'>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? ( 
                                <Message>Your cart is empty</Message>
                            ) : ( 
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
                                        {cart.cartItems.map((item, index) => (
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
                            )}
                        </ListGroup.Item>
                    </Card>
                </ListGroup>
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
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(cart.itemsPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(cart.shippingPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Calculated Tax</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(cart.taxPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col style={{textAlign:"right", paddingRight: '10%'}}>$ {addDecimals(cart.totalPrice)}</Col>
                            </Row>
                        </ListGroup.Item>
                        {error ? ( 
                            <ListGroup.Item disabled>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        ) : ('')}
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick= { placeOrderHandler }>
                                Proceed to Payment
                            </Button>
                        {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default PlaceOrderScreen
