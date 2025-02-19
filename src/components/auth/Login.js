import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import AuthController from '../../controllers/AuthController';
import MainLayout from '../layout/MainLayout';
import './Auth.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Số điện thoại là bắt buộc'),
    password: Yup.string()
      .required('Mật khẩu là bắt buộc')
  });

  const handleLogin = async (formValue) => {
    const { email, password } = formValue;
    setError('');
    setLoading(true);

    try {
      const user = await AuthController.login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(typeof error === 'string' ? error : 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="auth-page login-page">
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="auth-card">
                <Card.Header as="h4" className="text-center">Đăng nhập</Card.Header>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group mb-3">
                          <label htmlFor="email">Số điện thoại</label>
                          <Field
                            name="email"
                            type="text"
                            className="form-control"
                            placeholder="Nhập số điện thoại của bạn"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="password">Mật khẩu</label>
                          <Field
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu của bạn"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="text-end mb-3">
                          <Link to="/forgot-password" className="forgot-password-link">
                            Quên mật khẩu?
                          </Link>
                        </div>

                        <div className="form-group text-center">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="w-100 btn-login"
                          >
                            {loading ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              "Đăng nhập"
                            )}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
                <Card.Footer className="text-center">
                  <div>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Login; 