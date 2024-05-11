import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{ backgroundColor: '#7B8A8B', color: '#FFFFFF' }}>
            <hr style={{ margin: '0' }} />
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>
                            ProShop &copy; {currentYear}
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )

}

export default Footer
