import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { api } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProductEdit() {
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', image: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error('Failed to fetch product');
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/items/${id}`, form);
      toast.success('Product updated');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={form.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={form.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={form.category} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={form.image} onChange={handleChange} />
        </Form.Group>

        <Button type="submit">Update Product</Button>
      </Form>
    </div>
  );
}
