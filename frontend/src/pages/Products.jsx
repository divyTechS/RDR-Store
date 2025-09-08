// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { api } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Products() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ['Electronics','Home', 'Clothing', 'Books', 'Accessories', 'Other'];

  // Fetch items from API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = Number(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice);

      const res = await api.get('/items', { params });
      setItems(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
  const applyFilters = () => {
    fetchItems();
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/items/${id}`);
      toast.success('Product deleted');
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 fw-bold">🛍️ Explore Our Products</h2>

      {/* Filters */}
      <Form className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
        <Form.Select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          style={{ maxWidth: '200px' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
        <Form.Control
          placeholder="Min Price"
          name="minPrice"
          type="number"
          value={filters.minPrice}
          onChange={handleFilterChange}
          style={{ maxWidth: '120px' }}
        />
        <Form.Control
          placeholder="Max Price"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          style={{ maxWidth: '120px' }}
        />
        <Button variant="primary" onClick={applyFilters}>
          Apply
        </Button>
      </Form>

      {/* Products List */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row className="g-4">
          {items.map((item, index) => (
            <Col md={4} key={item._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0px 8px 20px rgba(0,0,0,0.15)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Card className="h-100 shadow-sm border-0 rounded overflow-hidden">
                    {item.image && (
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Card.Img
                          variant="top"
                          src={item.image}
                          style={{ height: '200px', objectFit: 'cover', transition: '0.3s ease' }}
                        />
                      </motion.div>
                    )}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold">{item.title}</Card.Title>
                      <Card.Text className="fw-bold text-success mb-2">₹{item.price}</Card.Text>
                      <Card.Text className="text-secondary small">{item.category}</Card.Text>

                      <div className="d-flex gap-2 mt-auto flex-wrap">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => addToCart(item._id)}
                          className="flex-grow-1"
                        >
                          🛒 Add to Cart
                        </Button>

                        {/* Show Edit/Delete only if user is creator */}
                        {item.createdBy === user?.id && (
                          <>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEdit(item._id)}
                              className="flex-grow-1"
                            >
                              ✏️ Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(item._id)}
                              className="flex-grow-1"
                            >
                              🗑️ Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
