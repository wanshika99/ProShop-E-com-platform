import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [updateProfile, { isLoading:loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => { 
        if (userInfo) { 
            setEmail(userInfo.email); 
            setName(userInfo.name); 
        }
    }, [userInfo.name, userInfo.email, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if ( newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
        } else { 
            try { 
                const res = await updateProfile({_id: userInfo._id, name, email, password: newPassword, currentPassword }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated Successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } catch (err) {
                toast.error(err?.data?.message || err.error )
            }
        } 
    }

return (
    <Row>
            <Col md={4}>
                <Card className='my-2'>
                    <ListGroup variant='flush'>
                    <Form onSubmit={submitHandler}>
                            <ListGroup.Item>
                                    <h3>User Profile</h3>
                                    <Form.Group controlId='name' className='my-2'>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                            type='name'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className='rounded'
                                            ></Form.Control>
                                    </Form.Group>
                    
                                    <Form.Group controlId='email' className='my-2'>
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                            type='email'
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className='rounded'
                                            ></Form.Control>
                                    </Form.Group>
                    
                                    <Form.Group controlId='password' className='my-2'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                            type='password'
                                            placeholder='Enter new password'
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            className='rounded'
                                            ></Form.Control>
                                    </Form.Group>
                    
                                    <Form.Group controlId='confirmPassword' className='my-2'>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                            type='password'
                                            placeholder='Confirm new password'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className='rounded'
                                            ></Form.Control>
                                    </Form.Group>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                    <Message variant='primary'>Please confirm your current password</Message>
                                    <Form.Group controlId='currentPassword' className='my-2'>
                                            <Form.Label>Current Password</Form.Label>
                                            <Form.Control
                                            type='password'
                                            placeholder='Enter current password'
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                            className='rounded'
                                            ></Form.Control>
                                    </Form.Group>
                                    
                                    <Button type='submit' variant='primary' className='my-2'>
                                            Update
                                    </Button>
                            </ListGroup.Item>
                    { loadingUpdateProfile && <Loader /> }
                    </Form>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={8}>
                <Card className='my-2'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>My Orders</h3>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
    </Row>
)
}

export default ProfileScreen
