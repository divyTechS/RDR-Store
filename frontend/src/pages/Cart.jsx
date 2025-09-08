import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';


export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQtyChange = (productId, qty) => {
    const quantity = Number(qty);
    if (quantity > 0) updateQuantity(productId, quantity);
  };

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Container className="my-5">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        My Cart
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
            {cart.items.map(({ product, quantity }, index) => (
              <Col md={4} key={product._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
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

                      <Form.Group className="mb-2">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => handleQtyChange(product._id, e.target.value)}
                        />
                      </Form.Group>

                      <Card.Text className="fw-bold">Subtotal: ₹{product.price * quantity}</Card.Text>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(product._id)}
                        className="mt-auto"
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-4"
          >
            <Button
              variant="secondary"
              className="mt-2 px-4 py-2"
              onClick={() => navigate('/products')}
            >
              Add Item
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-4"
          >
            <h4>Total: ₹{total}</h4>
            <Button variant="secondary" onClick={clearCart} className="mt-2 px-4 py-2">
              Clear Cart
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
