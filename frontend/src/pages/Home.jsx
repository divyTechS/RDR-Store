// src/pages/Home.jsx
import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('/products');
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '550px' }}
      >
        <Card className="shadow-lg rounded-4 border-0 text-center bg-light p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card.Title className="mb-3" style={{ fontSize: '2rem', fontWeight: '700', color: '#0d6efd' }}>
              👋 Welcome, {user?.name || user?.email}!
            </Card.Title>
            <Card.Text className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
              Glad to have you here. Explore our collection of products and enjoy a seamless shopping experience.
            </Card.Text>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={goToProducts}
                variant="primary"
                size="lg"
                className="px-4 py-2 rounded-pill shadow-sm"
                style={{ fontWeight: '600', fontSize: '1.1rem' }}
              >
                🛒 View Products
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </Container>
  );
}
