import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ProgressBar, Step } from 'react-step-progress-bar';

const CheckoutSteps = ({ step1, step2, step3, step4}) => {
    console.log(step1, step2, step3, step4);
    var percentage = step4 ? 100 : step3 ? 75 : step2 ? 50 : step1 ? 25 : 0;

return (
    <>
    <ProgressBar percent={percentage} width={310}>
        <Step>
            {({ accomplished, index }) => (
            <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                {step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>{index + 1}</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>{index + 1}</Nav.Link>
            )}
            </div>
            )}
        </Step>
        
        <Step>
            {({ accomplished, index }) => (
            <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>{index + 1}</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>{index + 1}</Nav.Link>
            )}
                
            </div>
            )}
        </Step>

        <Step>
            {({ accomplished, index }) => (
            <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                {step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>{index + 1}</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>{index + 1}</Nav.Link>
            )}
            </div>
            )}
        </Step>

        <Step>
            {({ accomplished, index }) => (
            <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
                {step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>{index + 1}</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>{index + 1}</Nav.Link>
            )}
            </div>
            )}
        </Step>
        
        </ProgressBar>


        <Nav className='justify-content-center mb-4'>
        <Nav.Item style={{marginLeft:'40px', paddingLeft:'10px'}}>
            {step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Sign In</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item style={{marginLeft:'10px'}}>
            {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item style={{marginLeft:'10px'}}>
            {step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Payment</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item style={{marginRight:'30px', paddingRight:'5px'}}>
            {step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
            )}
        </Nav.Item>
        </Nav>
    </>
);
}

export default CheckoutSteps
