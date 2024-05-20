import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const existingProducts = products?.filter((product) => product.name !== 'Sample name');

  return (
    <>
    { isLoading ? (
      <Loader />
    ) : error ? (
    <Message variant='danger'>
      { error?.data?.message || error.error }
    </Message>) : (
    <>
    <h1>Latest Products</h1>
    <Row>
        {existingProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={6} xl={4}>
                <Product product={product} />
            </Col>
        )) }
    </Row></>) }
    </>
  )
}

export default HomeScreen
