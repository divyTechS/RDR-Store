import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { api } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (cart.items.length === 0) return toast.error('Cart is empty');
    setLoading(true);
    try {
      const res = await api.post('/checkout');
      toast.success(`${res.data.message}. Total paid: ₹${res.data.total}`);
      clearCart();
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        Checkout
      </motion.h2>

      {cart.items.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          Your cart is empty
        </motion.p>
      ) : (
        <>
          <Row className="g-4">
            {cart.items.map(({ product, quantity }) => (
              <Col md={4} key={product._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Card className="shadow-sm border-0 h-100 hover-scale">
                    {product.image && (
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-truncate">{product.title}</Card.Title>
                      <Card.Text className="mb-1">Price: ₹{product.price}</Card.Text>
                      <Card.Text className="mb-1">Quantity: {quantity}</Card.Text>
                      <Card.Text className="fw-bold">Subtotal: ₹{product.price * quantity}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-4"
          >
            <h4>Total: ₹{total}</h4>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="px-4 py-2 mt-2"
              variant="success"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </motion.div>
        </>
      )}

      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.03);
          transition: transform 0.2s;
        }
      `}</style>
    </Container>
  );
}
