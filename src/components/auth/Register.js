import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import AuthController from '../../controllers/AuthController';
import MainLayout from '../layout/MainLayout';
import './Auth.css';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Họ tên là bắt buộc')
      .min(3, 'Họ tên phải có ít nhất 3 ký tự'),
    username: Yup.string()
      .required('Tên đăng nhập là bắt buộc')
      .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
      .matches(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    phone: Yup.string()
      .required('Số điện thoại là bắt buộc')
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ (10-11 số)'),
    password: Yup.string()
      .required('Mật khẩu là bắt buộc')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
      .required('Xác nhận mật khẩu là bắt buộc')
  });

  const handleRegister = async (formValue) => {
    const { name, username, email, phone, password } = formValue;
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // Lưu thông tin đăng ký vào localStorage để sử dụng sau khi xác thực OTP
      AuthController.saveRegistrationData({ name, username, email, phone, password });
      
      // Gửi yêu cầu OTP
      await AuthController.sendOTP(email);
      
      setMessage('Vui lòng kiểm tra email của bạn để nhận mã OTP xác thực.');
      
      // Điều hướng đến trang xác thực OTP
      setTimeout(() => {
        navigate('/verify-otp');
      }, 2000);
    } catch (error) {
      setError(error.toString());
      // Xóa dữ liệu đăng ký nếu có lỗi
      AuthController.clearRegistrationData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="auth-page register-page">
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="auth-card">
                <Card.Header as="h4" className="text-center">Đăng ký tài khoản</Card.Header>
                <Card.Body>
                  {message && <Alert variant="success">{message}</Alert>}
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group mb-3">
                          <label htmlFor="name">Họ tên</label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Nhập họ tên của bạn"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="username">Tên đăng nhập</label>
                          <Field
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên đăng nhập của bạn"
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="email">Email</label>
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Nhập email của bạn"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="phone">Số điện thoại</label>
                          <Field
                            name="phone"
                            type="text"
                            className="form-control"
                            placeholder="Nhập số điện thoại của bạn"
                          />
                          <ErrorMessage
                            name="phone"
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

                        <div className="form-group mb-3">
                          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Xác nhận mật khẩu của bạn"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group text-center mt-4">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="w-100 btn-login"
                          >
                            {loading ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              "Đăng ký"
                            )}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
                <Card.Footer className="text-center">
                  <div>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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

export default Register; 