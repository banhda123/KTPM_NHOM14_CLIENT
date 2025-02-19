import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import AuthController from '../../controllers/AuthController';

const VerifyOTP = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  // Lấy thông tin đăng ký từ localStorage
  useEffect(() => {
    const registrationData = AuthController.getRegistrationData();
    if (!registrationData) {
      // Nếu không có dữ liệu đăng ký, điều hướng về trang đăng ký
      navigate('/register');
    }
  }, [navigate]);

  // Đếm ngược thời gian gửi lại OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const initialValues = {
    otp: ''
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required('Mã OTP là bắt buộc')
      .matches(/^[0-9]+$/, 'Mã OTP chỉ chứa số')
      .min(4, 'Mã OTP phải có ít nhất 4 ký tự')
      .max(6, 'Mã OTP không quá 6 ký tự')
  });

  const handleVerify = async (formValue) => {
    const { otp } = formValue;
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // Lấy thông tin đăng ký
      const registrationData = AuthController.getRegistrationData();
      if (!registrationData) {
        throw new Error('Không tìm thấy thông tin đăng ký');
      }

      const { name, username, email, phone, password } = registrationData;

      // Xác thực OTP
      await AuthController.verifyOTP(email, otp);
      
      // Nếu xác thực thành công, hoàn tất đăng ký
      await AuthController.completeRegistration(name, username, email, phone, password);
      
      setMessage('Xác thực OTP thành công! Tài khoản của bạn đã được đăng ký.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
    
    try {
      const registrationData = AuthController.getRegistrationData();
      if (!registrationData) {
        throw new Error('Không tìm thấy thông tin đăng ký');
      }

      const { email } = registrationData;
      
      // Gửi lại OTP
      await AuthController.sendOTP(email);
      
      setMessage('Đã gửi lại mã OTP. Vui lòng kiểm tra email của bạn.');
      
      // Reset đếm ngược
      setCountdown(60);
      setResendDisabled(true);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">Xác thực OTP</Card.Header>
            <Card.Body>
              <p className="text-center">
                Vui lòng nhập mã OTP đã được gửi đến email của bạn để hoàn tất đăng ký.
              </p>
              
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleVerify}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="otp">Mã OTP</label>
                      <Field
                        name="otp"
                        type="text"
                        className="form-control"
                        placeholder="Nhập mã OTP"
                      />
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group text-center mt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="w-100"
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          "Xác thực"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              
              <div className="text-center mt-3">
                <div className="mb-2">
                  {resendDisabled ? `Gửi lại OTP sau ${countdown} giây` : "Không nhận được mã?"}
                </div>
                <Button
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={resendDisabled || loading}
                >
                  Gửi lại mã OTP
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOTP; 