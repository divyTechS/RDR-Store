// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';

// Pages
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductEdit from './pages/ProductEdit';
import ProductCreate from './pages/ProductCreate';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <Toaster position="top-right" />

      {/* Navbar */}
<Navbar expand="lg" bg="primary" variant="dark" className="shadow-sm mb-4 py-3" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            RDR Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-links" />
          <Navbar.Collapse id="nav-links">
            <Nav className="ms-auto align-items-center">
              {user ? (
                <>
                  <span className="text-white me-3 fw-semibold">
                    Hi, {user.name || user.email}
                  </span>
                  <Nav.Link as={Link} to="/products">Products</Nav.Link>
                  <Nav.Link as={Link} to="/products/create">Add Product</Nav.Link>
                  <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                  <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
                  <Nav.Link onClick={logout} className="fw-bold text-danger">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Animated Page Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        <Container>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/products/edit/:id" element={<PrivateRoute><ProductEdit /></PrivateRoute>} />
            <Route path="/products/create" element={<PrivateRoute><ProductCreate /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </motion.div>
    </>
  );
}

export default App;
