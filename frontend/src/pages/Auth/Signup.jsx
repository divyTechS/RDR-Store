// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!emailRegex.test(form.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await signup(form);
      navigate('/');
    } catch (err) {
      console.error(err);
      // additional error handling if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Body>
        <Card.Title>Signup</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name (optional)</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="At least 8 chars"
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Signup'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
