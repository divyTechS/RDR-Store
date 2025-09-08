import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProductCreate() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '' // store image URL
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      return toast.error('Title and price are required');
    }

    try {
      await api.post('/items', form); // send JSON now
      toast.success('Product created successfully');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="container my-4">
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
                        <option value="Accessories">Accessories</option>

            <option value="Other">Other</option>

          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Button type="submit">Create Product</Button>
      </Form>
    </div>
  );
}
